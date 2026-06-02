// Convert all .ts/.tsx in src/ to .js/.jsx, strip types, swap TanStack -> react-router-dom
import { transform } from "esbuild";
import { readdir, readFile, writeFile, unlink, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = "src";

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

// Delete TanStack-specific files entirely
const DELETE_FILES = new Set([
  "src/router.tsx",
  "src/routeTree.gen.ts",
  "src/server.ts",
  "src/start.ts",
  "src/routes/__root.tsx",
  "src/routes/sitemap[.]xml.ts",
  "src/lib/config.server.ts",
  "src/lib/api/example.functions.ts",
]);

function convertRouteFile(source, routePath) {
  // Drop createFileRoute block, export component as default
  // Find: export const Route = createFileRoute("...")({  ...  component: XXX,  ... });
  let src = source;
  // Remove the entire Route export block (greedy until matching `});` after the createFileRoute call)
  const startIdx = src.indexOf("export const Route");
  if (startIdx === -1) return src;
  // find component name first
  const block = src.slice(startIdx);
  const componentMatch = block.match(/component:\s*([A-Za-z0-9_]+)/);
  const componentName = componentMatch ? componentMatch[1] : null;
  // Extract head meta if present
  let title = null, description = null;
  const titleMatch = block.match(/title:\s*"([^"]+)"/);
  if (titleMatch) title = titleMatch[1];
  const descMatch = block.match(/name:\s*"description"\s*,\s*content:\s*"([^"]+)"/);
  if (descMatch) description = descMatch[1];

  // Remove the export block: from `export const Route` through the matching `});`
  // Naive: find next `});\n` after a `);` that closes createFileRoute. We'll match `});\n` after the start.
  // Use a parenthesis depth scan starting at startIdx
  let i = startIdx;
  while (i < src.length && src[i] !== "(") i++;
  // first ( is after createFileRoute name? No - first ( might be of createFileRoute("/")
  // We need to find when full statement ends with `);`
  let depth = 0, end = -1, inStr = false, strCh = "";
  for (let j = startIdx; j < src.length; j++) {
    const c = src[j];
    if (inStr) {
      if (c === "\\") { j++; continue; }
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = true; strCh = c; continue; }
    if (c === "(" || c === "{" || c === "[") depth++;
    else if (c === ")" || c === "}" || c === "]") {
      depth--;
      if (depth === 0) {
        // look for trailing ;
        let k = j + 1;
        while (k < src.length && /\s/.test(src[k])) k++;
        if (src[k] === ";") { end = k + 1; break; }
        end = j + 1; break;
      }
    }
  }
  if (end === -1) return src;
  // Build head injection
  let headInject = "";
  if (title || description) {
    headInject = `\nimport { useEffect as __useEffect } from "react";\nfunction __PageMeta(){__useEffect(()=>{${title?`document.title=${JSON.stringify(title)};`:''}${description?`let m=document.querySelector('meta[name="description"]');if(!m){m=document.createElement('meta');m.setAttribute('name','description');document.head.appendChild(m);}m.setAttribute('content',${JSON.stringify(description)});`:''}},[]);return null;}\n`;
  }
  let replaced = src.slice(0, startIdx) + headInject + src.slice(end);
  // append default export
  if (componentName) {
    // wrap component to include PageMeta
    if (headInject) {
      replaced += `\nconst __Default = () => (<>{<__PageMeta/>}{<${componentName}/>}</>);\nexport default __Default;\n`;
    } else {
      replaced += `\nexport default ${componentName};\n`;
    }
  }
  return replaced;
}

function swapTanstackImports(src) {
  // Replace import {...} from "@tanstack/react-router"
  src = src.replace(
    /import\s*\{([^}]+)\}\s*from\s*["']@tanstack\/react-router["'];?/g,
    (m, names) => {
      const list = names.split(",").map((s) => s.trim()).filter(Boolean);
      const map = {
        Link: "Link",
        Outlet: "Outlet",
        useNavigate: "useNavigate",
        useRouter: null, // not directly mapped
        useLocation: "useLocation",
        useParams: "useParams",
        useSearch: null,
        createFileRoute: null,
        createRootRouteWithContext: null,
        createRootRoute: null,
        HeadContent: null,
        Scripts: null,
        redirect: null,
      };
      const rrd = [];
      for (const n of list) {
        const base = n.replace(/\s+as\s+.*/, "").trim();
        if (map[base]) rrd.push(map[base]);
      }
      const uniq = [...new Set(rrd)];
      return uniq.length ? `import { ${uniq.join(", ")} } from "react-router-dom";` : "";
    }
  );
  // Remove activeProps={...} and activeOptions={...} (TanStack-only)
  src = src.replace(/\s+activeProps=\{\{[^}]*\}\}/g, "");
  src = src.replace(/\s+activeOptions=\{\{[^}]*\}\}/g, "");
  // Replace `as const` casts (esbuild strips them but just in case)
  return src;
}

async function processFile(path) {
  if (DELETE_FILES.has(path)) {
    await unlink(path);
    console.log("DELETED", path);
    return;
  }
  const ext = extname(path);
  if (ext !== ".ts" && ext !== ".tsx") return;
  let src = await readFile(path, "utf8");

  // Route file conversion (before strip)
  if (path.startsWith("src/routes/") && path !== "src/routes/__root.tsx") {
    src = convertRouteFile(src, path);
  }

  src = swapTanstackImports(src);

  const isTsx = ext === ".tsx";
  const out = await transform(src, {
    loader: isTsx ? "tsx" : "ts",
    jsx: "preserve",
    target: "esnext",
    format: "esm",
  });
  let code = out.code;
  // esbuild may strip "as const" but leaves expressions; that's fine
  const newExt = isTsx ? ".jsx" : ".js";
  const newPath = path.replace(/\.tsx?$/, newExt);
  await writeFile(newPath, code);
  if (newPath !== path) await unlink(path);
  console.log("CONVERTED", path, "->", newPath);
}

const files = await walk(ROOT);
for (const f of files) {
  try {
    await processFile(f);
  } catch (e) {
    console.error("ERROR", f, e.message);
  }
}

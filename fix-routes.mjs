// Remove orphan `({ head: ..., component: X });` block left over in route files
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dir = "src/routes";
for (const f of await readdir(dir)) {
  if (!f.endsWith(".jsx")) continue;
  const p = join(dir, f);
  let s = await readFile(p, "utf8");
  // Find orphan `\n({\n` at top-level (after PageMeta function or after imports)
  // Strategy: scan for line starting with `({` and remove until matching `});`
  const lines = s.split("\n");
  let outLines = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith("({") && (line.trim() === "({" || /^\(\{$/.test(line.trim()))) {
      // skip until matching `});`
      let depth = 0;
      while (i < lines.length) {
        const l = lines[i];
        for (const c of l) {
          if (c === "(" || c === "{" || c === "[") depth++;
          else if (c === ")" || c === "}" || c === "]") depth--;
        }
        i++;
        if (depth === 0) break;
      }
      continue;
    }
    outLines.push(line);
    i++;
  }
  const fixed = outLines.join("\n");
  if (fixed !== s) {
    await writeFile(p, fixed);
    console.log("fixed", p);
  }
}

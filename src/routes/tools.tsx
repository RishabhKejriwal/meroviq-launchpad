import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, FileCog, FileSignature, SpellCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Free Tools — Meroviq Technologies" },
      { name: "description", content: "Free productivity tools — digital signature, grammar corrector, file converter and QA effort estimator." },
      { property: "og:url", content: "/tools" },
    ],
    links: [{ rel: "canonical", href: "/tools" }],
  }),
  component: Page,
});

const TOOLS = [
  { to: "/tools/digital-signature", title: "Digital Signature", desc: "Sign and share documents instantly.", icon: FileSignature },
  { to: "/tools/grammar-corrector", title: "Grammar Corrector", desc: "Catch errors and improve clarity.", icon: SpellCheck },
  { to: "/tools/file-converter", title: "File Converter", desc: "Convert between common file formats.", icon: FileCog },
  { to: "/tools/qa-estimator", title: "QA Effort Estimator", desc: "Estimate testing effort in minutes.", icon: Calculator },
] as const;

function Page() {
  return (
    <>
      <PageHero eyebrow="Free tools" title={<>Productivity, on the house</>} subtitle="Useful utilities — free forever. No sign-up required." />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map((t) => (
            <Link key={t.to} to={t.to} className="group rounded-2xl border border-hairline bg-white p-7 shadow-soft hover:-translate-y-1 hover:shadow-glow transition">
              <div className="h-12 w-12 rounded-xl gradient-brand text-white flex items-center justify-center"><t.icon className="h-6 w-6" /></div>
              <h3 className="mt-5 font-semibold text-ink">{t.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{t.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:gap-3 transition-all">Open <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

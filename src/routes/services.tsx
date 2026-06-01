import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Section, EyebrowHeading } from "@/components/site/Section";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Meroviq Technologies" },
      { name: "description", content: "Development, testing, CRM and digital marketing services for small businesses and startups." },
      { property: "og:title", content: "Services — Meroviq Technologies" },
      { property: "og:description", content: "Engineering and marketing services built for growth." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Page,
});

const CATS = [
  { to: "/services/development", title: "Development & Testing", desc: "Web, SaaS customization, custom software and QA across the stack.", icon: Code2 },
  { to: "/services/marketing", title: "Digital Marketing", desc: "SEO, social, YouTube, performance marketing and analytics.", icon: Megaphone },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Engineering & growth, <span className="text-gradient-brand">end to end</span></>}
        subtitle="Pick a service area to dive in. Every engagement starts with discovery and ends with measurable outcomes."
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {CATS.map((c) => (
            <Link key={c.to} to={c.to} className="group rounded-3xl border border-hairline bg-white p-8 shadow-soft hover:-translate-y-1 hover:shadow-glow transition">
              <div className="h-14 w-14 rounded-2xl gradient-brand text-white flex items-center justify-center"><c.icon className="h-7 w-7" /></div>
              <h2 className="mt-6 text-2xl font-bold text-ink">{c.title}</h2>
              <p className="mt-2 text-ink-muted">{c.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-brand font-semibold group-hover:gap-3 transition-all">Explore <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="gradient-brand text-white">
            <Link to="/contact">Get Started Today <ArrowRight /></Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

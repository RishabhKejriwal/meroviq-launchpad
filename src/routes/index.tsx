import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Code2, GraduationCap, LayoutDashboard, Megaphone, Sparkles, Shield, Clock, HeartHandshake, Users, FileSignature, SpellCheck, FileCog, Calculator, Leaf, Mail, Phone, Linkedin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, EyebrowHeading } from "@/components/site/Section";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meroviq Technologies — Scalable Digital Solutions for Growing Businesses" },
      { name: "description", content: "CRM, software development, digital marketing and IT internships built for small businesses, entrepreneurs and the next generation of tech talent." },
      { property: "og:title", content: "Meroviq Technologies" },
      { property: "og:description", content: "Transforming ideas into scalable digital solutions." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const SERVICES = [
  { to: "/meroviq-360", title: "Meroviq 360", desc: "All-in-one CRM platform to manage, automate and grow your business.", cta: "Explore Product", icon: LayoutDashboard },
  { to: "/services/development", title: "Development & Testing", desc: "Website development, SaaS customization, custom software and QA testing.", cta: "Explore Services", icon: Code2 },
  { to: "/services/marketing", title: "Digital Marketing", desc: "SEO, social media, YouTube and performance marketing.", cta: "Explore Services", icon: Megaphone },
  { to: "/launchpad", title: "Meroviq Launchpad", desc: "Internship program designed to provide real-world IT experience.", cta: "Explore Program", icon: GraduationCap },
] as const;

const WHY = [
  { icon: Users, title: "Built for Small Businesses", desc: "Designed for entrepreneurs and growing companies." },
  { icon: Sparkles, title: "Cost-Effective Solutions", desc: "High value without high costs." },
  { icon: Clock, title: "Time-Saving Technology", desc: "Simplifying work so you can focus on growth." },
  { icon: HeartHandshake, title: "Customer-First Approach", desc: "Your success is our priority." },
];

const TOOLS = [
  { to: "/tools/digital-signature", title: "Digital Signature", desc: "Sign documents online securely in seconds.", icon: FileSignature },
  { to: "/tools/grammar-corrector", title: "Grammar Corrector", desc: "Polish your writing with AI-powered checks.", icon: SpellCheck },
  { to: "/tools/file-converter", title: "File Converter", desc: "Convert between formats with one click.", icon: FileCog },
  { to: "/tools/qa-estimator", title: "QA Effort Estimator", desc: "Plan testing effort with smart heuristics.", icon: Calculator },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div aria-hidden className="absolute inset-0 grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div aria-hidden className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-brand opacity-10 blur-3xl" />
        <div aria-hidden className="absolute top-20 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent2 opacity-10 blur-3xl" />

        <div className="container-page relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-soft text-brand">
              <Sparkles className="h-3.5 w-3.5" /> Technology with purpose
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
              Transforming Ideas into <span className="text-gradient-brand">Scalable Digital Solutions</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-ink-muted leading-relaxed max-w-xl">
              We help small businesses and entrepreneurs build, automate and grow using cost-effective and powerful technology solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-brand text-white shadow-glow hover:opacity-95">
                <Link to="/meroviq-360">Try For Free <ArrowRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-brand/20 hover:bg-brand-soft hover:text-brand">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-muted">
              {["No credit card", "Cancel anytime", "Setup in minutes"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent2" /> {t}
                </span>
              ))}
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* SERVICES */}
      <Section id="services">
        <EyebrowHeading eyebrow="What we offer" title="Explore What We Offer" subtitle="A complete digital ecosystem for ambitious teams — from CRM and custom builds to growth marketing and talent." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group relative rounded-2xl border border-hairline bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-brand/30"
            >
              <div className="h-12 w-12 rounded-xl gradient-brand text-white flex items-center justify-center shadow-soft">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:gap-3 transition-all">
                {s.cta} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section className="bg-surface">
        <EyebrowHeading eyebrow="Why Meroviq" title="Built for the way you grow" subtitle="Practical technology, predictable pricing, and a partner that genuinely cares." />
        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {WHY.map((w) => (
            <div key={w.title} className="flex gap-5 rounded-2xl bg-white p-7 border border-hairline shadow-soft">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-accent2-soft text-accent2 flex items-center justify-center">
                <w.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">{w.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TOOLS */}
      <Section>
        <EyebrowHeading eyebrow="Free tools" title="Free Tools To Boost Productivity" subtitle="Lightweight utilities, free forever. Built to save your team hours every week." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((t) => (
            <div key={t.to} className="group rounded-2xl border border-hairline bg-white p-6 hover:border-accent2/30 hover:shadow-soft transition">
              <div className="h-10 w-10 rounded-lg bg-accent2-soft text-accent2 flex items-center justify-center">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-ink">{t.title}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{t.desc}</p>
              <Button asChild variant="ghost" className="mt-3 px-0 text-brand hover:bg-transparent hover:text-accent2">
                <Link to={t.to}>Open tool <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* IMPACT */}
      <Section className="bg-surface">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-hairline bg-white p-10 shadow-soft">
            <div aria-hidden className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, #008369 0%, transparent 50%), radial-gradient(circle at 80% 80%, #004188 0%, transparent 50%)" }} />
            <div className="relative grid grid-cols-2 gap-4">
              {[Leaf, HeartHandshake, GraduationCap, Shield].map((Icon, i) => (
                <div key={i} className="rounded-2xl bg-white/80 backdrop-blur p-6 border border-hairline">
                  <Icon className="h-7 w-7 text-accent2" />
                  <div className="mt-3 h-2 w-16 rounded-full bg-brand/20" />
                  <div className="mt-2 h-2 w-24 rounded-full bg-brand/10" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent2-soft text-accent2">
              Meroviq Impact
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-ink">Technology With Purpose</h2>
            <p className="mt-4 text-lg text-ink-muted leading-relaxed">
              We invest in sustainability, education, community development, wellness and environmental impact — because great technology should leave the world better than it found it.
            </p>
            <Button asChild size="lg" className="mt-6 bg-accent2 text-white hover:bg-accent2/90">
              <Link to="/impact">Explore Meroviq Impact <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-soft text-brand">About us</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-ink">Our story</h2>
            <p className="mt-4 text-lg text-ink-muted leading-relaxed">
              Meroviq Technologies was founded to bridge the gap between enterprise-grade software and the realities of small business budgets. We build accessible, dependable products and train the next generation of IT professionals along the way.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { n: "150+", l: "Projects shipped" },
                { n: "40+", l: "Interns trained" },
                { n: "98%", l: "Client retention" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-bold text-gradient-brand">{s.n}</div>
                  <div className="mt-1 text-sm text-ink-muted">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {[
              { title: "Mission", body: "Empower businesses with cost-effective technology." },
              { title: "Vision", body: "Become a trusted technology partner." },
              { title: "Values", body: "Integrity · Innovation · Customer-Centric Approach" },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-hairline bg-white p-6 shadow-soft">
                <h3 className="font-semibold text-brand">{c.title}</h3>
                <p className="mt-2 text-ink-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="bg-surface">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <EyebrowHeading
              align="left"
              eyebrow="Contact"
              title="Let's build something together"
              subtitle="Tell us about your project, your team or the problem you're trying to solve. We respond within one business day."
            />
            <div className="space-y-3">
              <a href="mailto:hello@meroviq.com" className="flex items-center gap-3 text-ink hover:text-brand">
                <span className="h-10 w-10 rounded-lg bg-brand-soft text-brand flex items-center justify-center"><Mail className="h-5 w-5" /></span>
                hello@meroviq.com
              </a>
              <a href="tel:+910000000000" className="flex items-center gap-3 text-ink hover:text-brand">
                <span className="h-10 w-10 rounded-lg bg-brand-soft text-brand flex items-center justify-center"><Phone className="h-5 w-5" /></span>
                +91 00000 00000
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-ink hover:text-brand">
                <span className="h-10 w-10 rounded-lg bg-brand-soft text-brand flex items-center justify-center"><Linkedin className="h-5 w-5" /></span>
                LinkedIn
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}

function HeroVisual() {
  return (
    <div className="relative h-[480px] hidden md:block animate-fade-in">
      {/* Main dashboard card */}
      <div className="absolute inset-0 rounded-3xl gradient-brand p-1 shadow-glow">
        <div className="h-full w-full rounded-[22px] bg-white p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>
            <span className="text-xs font-medium text-ink-muted">Meroviq 360</span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { l: "Leads", v: "1,248", c: "text-brand" },
              { l: "Revenue", v: "$84k", c: "text-accent2" },
              { l: "Tasks", v: "92%", c: "text-brand" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-surface p-3">
                <div className="text-[10px] uppercase tracking-wider text-ink-muted">{s.l}</div>
                <div className={`mt-1 text-lg font-bold ${s.c}`}>{s.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex-1 rounded-xl bg-surface p-4 flex items-end gap-2">
            {[40, 65, 50, 80, 55, 90, 70, 95, 60, 88].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md gradient-brand" style={{ height: `${h}%`, opacity: 0.4 + i * 0.06 }} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-hairline p-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-brand" />
              <span className="text-xs font-medium text-ink">Analytics</span>
            </div>
            <div className="rounded-xl border border-hairline p-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent2" />
              <span className="text-xs font-medium text-ink">Automations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <div className="absolute -left-8 top-20 rounded-2xl bg-white border border-hairline shadow-glow p-4 w-56 animate-float">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent2-soft text-accent2 flex items-center justify-center">
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-ink-muted">Campaign live</div>
            <div className="text-sm font-semibold text-ink">+38% CTR</div>
          </div>
        </div>
      </div>
      <div className="absolute -right-6 bottom-12 rounded-2xl bg-white border border-hairline shadow-glow p-4 w-56" style={{ animation: "float 6s ease-in-out infinite", animationDelay: "1.5s" }}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-brand-soft text-brand flex items-center justify-center">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-ink-muted">Deployed</div>
            <div className="text-sm font-semibold text-ink">v2.4 · success</div>
          </div>
        </div>
      </div>
    </div>
  );
}

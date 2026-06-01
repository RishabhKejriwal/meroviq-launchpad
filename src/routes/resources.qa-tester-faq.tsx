import { createFileRoute } from "@tanstack/react-router";
import { Guide } from "@/components/site/Guide";

export const Route = createFileRoute("/resources/qa-tester-faq")({
  head: () => ({
    meta: [
      { title: "QA Tester FAQ Guide — Meroviq" },
      { name: "description", content: "Everything you wanted to know about a QA career — tools, skills and growth." },
      { property: "og:url", content: "/resources/qa-tester-faq" },
    ],
    links: [{ rel: "canonical", href: "/resources/qa-tester-faq" }],
  }),
  component: Page,
});

function Page() {
  return (
    <Guide
      title={<>QA Tester FAQ Guide</>}
      subtitle="Manual, automation and the mindset that makes great testers."
      sections={[
        { id: "what", title: "What does a QA tester do?", body: <p>Ensures software does what it should, doesn't do what it shouldn't, and feels right to users.</p> },
        { id: "skills", title: "Core skills", body: <p>Curiosity, structured thinking, basic SQL, an automation framework and clear bug reports.</p> },
        { id: "tools", title: "Common tools", body: <p>Postman, Playwright/Cypress, JIRA, TestRail, Selenium and AWS for environment management.</p> },
        { id: "auto", title: "When to automate", body: <p>Stable flows, repeated regressions and data-driven scenarios. Not exploratory testing.</p> },
        { id: "career", title: "Career growth", body: <p>QA Lead → SDET → QA Architect → Engineering Manager. Each step adds breadth and responsibility.</p> },
      ]}
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Guide } from "@/components/site/Guide";

export const Route = createFileRoute("/resources/salesforce-career-faq")({
  head: () => ({
    meta: [
      { title: "Salesforce Career FAQ Guide — Meroviq" },
      { name: "description", content: "Roadmap, certifications and tips for a successful Salesforce career." },
      { property: "og:url", content: "/resources/salesforce-career-faq" },
    ],
    links: [{ rel: "canonical", href: "/resources/salesforce-career-faq" }],
  }),
  component: Page,
});

function Page() {
  return (
    <Guide
      title={<>Salesforce Career FAQ Guide</>}
      subtitle="From Trailhead to Architect — the path that actually works."
      sections={[
        { id: "intro", title: "Is Salesforce a good career?", body: <p>Yes — the ecosystem keeps expanding and roles span business, admin, and engineering.</p> },
        { id: "start", title: "How do I get started?", body: <p>Complete the Admin trail on Trailhead, sit the Admin exam, then ship a small AppExchange-style project.</p> },
        { id: "certs", title: "Which certifications matter?", body: <p>Admin → Platform App Builder → Platform Developer I. Specialize from there based on your role.</p> },
        { id: "roles", title: "Common roles", body: <p>Admin, Consultant, Developer, Architect, Marketing Cloud Specialist.</p> },
        { id: "salary", title: "Salary expectations", body: <p>Highly market-dependent; specialization (CPQ, Marketing Cloud, Architect) commands a premium.</p> },
      ]}
    />
  );
}

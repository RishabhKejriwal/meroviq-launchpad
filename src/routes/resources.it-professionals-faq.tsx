import { createFileRoute } from "@tanstack/react-router";
import { Guide } from "@/components/site/Guide";

export const Route = createFileRoute("/resources/it-professionals-faq")({
  head: () => ({
    meta: [
      { title: "IT Professionals FAQ Guide — Meroviq" },
      { name: "description", content: "Common questions answered for aspiring and early-career IT professionals." },
      { property: "og:url", content: "/resources/it-professionals-faq" },
    ],
    links: [{ rel: "canonical", href: "/resources/it-professionals-faq" }],
  }),
  component: Page,
});

function Page() {
  return (
    <Guide
      title={<>IT Professionals FAQ Guide</>}
      subtitle="Career paths, skills, and the questions every IT fresher should ask."
      sections={[
        { id: "start", title: "Where should I start?", body: <p>Pick one stack and ship two real projects. Depth beats breadth in your first 12 months.</p> },
        { id: "skills", title: "Skills that compound", body: <p>Version control, debugging, written communication and a working understanding of the cloud. They pay off forever.</p> },
        { id: "portfolio", title: "Building a portfolio", body: <p>Three projects with a real user, even if that user is you. Document trade-offs in a short README.</p> },
        { id: "interviews", title: "Interview prep", body: <p>Practice explaining decisions out loud. Most interviews assess how you think, not what you've memorized.</p> },
        { id: "growth", title: "Long-term growth", body: <p>Specialize after two years, generalize after seven. Stay close to the customer at every level.</p> },
      ]}
    />
  );
}

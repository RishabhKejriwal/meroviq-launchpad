import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/meroviq-360", label: "Meroviq 360" },
  { to: "/services", label: "Services" },
  { to: "/launchpad", label: "Launchpad" },
  { to: "/impact", label: "Impact" },
  { to: "/tools", label: "Tools" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-hairline shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container-page flex h-16 md:h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Meroviq Technologies home">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg gradient-brand text-white font-display font-bold shadow-soft">M</span>
          <span className="font-display font-semibold text-ink tracking-tight">
            Meroviq <span className="text-ink-muted font-normal">Technologies</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-ink/80 hover:text-brand rounded-md transition-colors"
              activeProps={{ className: "text-brand" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" className="text-ink hover:text-brand hover:bg-brand-soft">
            <Link to="/contact">Contact Us</Link>
          </Button>
          <Button asChild className="gradient-brand text-white shadow-soft hover:opacity-95">
            <Link to="/meroviq-360">Try For Free</Link>
          </Button>
        </div>

        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-brand-soft"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-hairline bg-white">
          <nav className="container-page py-4 flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-ink/90 hover:bg-brand-soft hover:text-brand font-medium"
                activeProps={{ className: "bg-brand-soft text-brand" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
              </Button>
              <Button asChild className="flex-1 gradient-brand text-white">
                <Link to="/meroviq-360" onClick={() => setOpen(false)}>Try Free</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

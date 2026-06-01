import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}

export function Section({ children, className, id, as: Tag = "section" }: SectionProps) {
  return (
    <Tag id={id} className={cn("py-20 md:py-28", className)}>
      <div className="container-page">{children}</div>
    </Tag>
  );
}

export function EyebrowHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-soft text-brand">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-ink">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-ink-muted leading-relaxed">{subtitle}</p>}
    </div>
  );
}

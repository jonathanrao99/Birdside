import Link from "next/link";
import type { ReactNode } from "react";
import "./peckers-style-action-button.css";

export type PeckersStyleActionVariant = "light" | "accent";

type PeckersStyleActionButtonProps = {
  href: string;
  variant: PeckersStyleActionVariant;
  children: ReactNode;
  className?: string;
};

export default function PeckersStyleActionButton({
  href,
  variant,
  children,
  className = ""
}: PeckersStyleActionButtonProps) {
  const external = href.startsWith("http://") || href.startsWith("https://");
  const wrapClass = ["peckers-action-btn-wrap", `peckers-action-btn-wrap--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const btnClass = `peckers-action-btn peckers-action-btn--${variant}`;

  return (
    <span className={wrapClass}>
      <span className="peckers-action-btn-shadow" aria-hidden />
      {external ? (
        <a className={btnClass} href={href} rel="noopener noreferrer" target="_blank">
          {children}
        </a>
      ) : (
        <Link className={btnClass} href={href}>
          {children}
        </Link>
      )}
    </span>
  );
}

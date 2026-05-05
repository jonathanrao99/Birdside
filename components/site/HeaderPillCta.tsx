import Link from "next/link";
import type { ReactNode } from "react";
import "./header-pill-cta.css";

export type HeaderPillCtaVariant = "light" | "accent";

type HeaderPillCtaProps = {
  href: string;
  variant: HeaderPillCtaVariant;
  children: ReactNode;
  className?: string;
};

export default function HeaderPillCta({
  href,
  variant,
  children,
  className = ""
}: HeaderPillCtaProps) {
  const external = href.startsWith("http://") || href.startsWith("https://");
  const wrapClass = ["header-pill-cta-wrap", `header-pill-cta-wrap--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const btnClass = `header-pill-cta header-pill-cta--${variant}`;

  return (
    <span className={wrapClass}>
      <span className="header-pill-cta-shadow" aria-hidden />
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

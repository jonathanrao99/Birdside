"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavMainLink } from "@/lib/site-shell-data";
import { pathIsActive } from "@/lib/path-active";

export function NavbarMainLink(props: NavMainLink) {
  const pathname = usePathname();
  const active = pathIsActive(pathname, props.href);

  return (
    <Link
      className={
        active ? "navbar_link w-inline-block w--current" : "navbar_link w-inline-block"
      }
      data-w-id={props.linkWId}
      href={props.href}
      aria-current={active ? "page" : undefined}
    >
      <div className="navbar_text">{props.label}</div>
    </Link>
  );
}

export function NavbarLogoLink({
  href,
  src,
  alt
}: {
  href: string;
  src: string;
  alt: string;
}) {
  const pathname = usePathname();
  const active = pathIsActive(pathname, href);
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={
        active
          ? "navbar_logo-wrap w-inline-block w--current"
          : "navbar_logo-wrap w-inline-block"
      }
      href={href}
    >
      <Image
        alt={alt}
        className="navbar_logo"
        height={48}
        priority
        src={src}
        style={{ width: "auto", height: "auto" }}
        width={160}
      />
    </Link>
  );
}

export type FooterColumnLinkProps = {
  href: string;
  label: string;
};

/** Footer column list link — internal routes get active state; mailto/http stay plain anchors. */
export function FooterColumnLink({ href, label }: FooterColumnLinkProps) {
  const pathname = usePathname();
  const isHttp = href.startsWith("http://") || href.startsWith("https://");
  const isMailOrTel =
    href.startsWith("mailto:") || href.startsWith("tel:");
  const pathForActive = href.split("#")[0]?.split("?")[0] ?? href;
  const skipActiveForHashRoute = href.includes("#");
  const active =
    !isHttp &&
    !isMailOrTel &&
    !skipActiveForHashRoute &&
    pathIsActive(pathname, pathForActive);
  const className = active
    ? "birdside-footer-column-link birdside-footer-column-link--current"
    : "birdside-footer-column-link";

  if (isHttp) {
    return (
      <a
        className={className}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {label}
      </a>
    );
  }

  if (isMailOrTel) {
    return (
      <a className={className} href={href}>
        {label}
      </a>
    );
  }

  return (
    <Link
      className={className}
      href={href}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function FooterLogoLink({
  href,
  src,
  alt
}: {
  href: string;
  src: string;
  alt: string;
}) {
  return (
    <Link className="footer_logo-wrap w-inline-block" href={href}>
      <Image
        alt={alt}
        className="footer_logo"
        height={48}
        src={src}
        style={{ width: "auto", height: "auto" }}
        width={160}
      />
    </Link>
  );
}

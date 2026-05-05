"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FooterNavLink, NavMainLink } from "@/lib/site-shell-data";
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

export function FooterMainLink(props: FooterNavLink) {
  const pathname = usePathname();
  const active = pathIsActive(pathname, props.href);

  return (
    <Link
      className={
        active ? "footer_link w-inline-block w--current" : "footer_link w-inline-block"
      }
      data-w-id={props.linkWId}
      href={props.href}
      aria-current={active ? "page" : undefined}
    >
      <div className="footer_link-text">{props.label}</div>
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

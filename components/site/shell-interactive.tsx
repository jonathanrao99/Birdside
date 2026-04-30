"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FooterNavLink, NavMainLink } from "@/lib/site-shell-data";
import { LINE_LOTTIE_SRC } from "@/lib/site-shell-data";
import { pathIsActive } from "@/lib/path-active";

function NavbarHoverLine({
  lineWId,
  lineLarge,
  lineAutoplay1,
  lineIx2Target0
}: Pick<
  NavMainLink,
  "lineWId" | "lineLarge" | "lineAutoplay1" | "lineIx2Target0"
>) {
  const lineClass = lineLarge ? "navbar_line large" : "navbar_line";
  const autoplay = lineAutoplay1 ? "1" : "0";
  const isIx2Target = lineIx2Target0 ? "0" : "1";
  const ix2Initial = lineIx2Target0 ? undefined : "0";
  return (
    <div
      className={lineClass}
      data-animation-type="lottie"
      data-autoplay={autoplay}
      data-default-duration="0"
      data-direction="1"
      data-duration="1.0010009602293968"
      data-is-ix2-target={isIx2Target}
      {...(ix2Initial !== undefined ? { "data-ix2-initial-state": ix2Initial } : {})}
      data-loop="0"
      data-renderer="svg"
      data-src={LINE_LOTTIE_SRC}
      data-w-id={lineWId}
    />
  );
}

export function NavbarMainLink(props: NavMainLink) {
  const pathname = usePathname();
  const active = pathIsActive(pathname, props.href);
  return (
    <Link
      className={
        active
          ? "navbar_link w-inline-block w--current"
          : "navbar_link w-inline-block"
      }
      data-w-id={props.linkWId}
      href={props.href}
      aria-current={active ? "page" : undefined}
    >
      <div className="navbar_text">{props.label}</div>
      <NavbarHoverLine
        lineWId={props.lineWId}
        lineLarge={props.lineLarge}
        lineAutoplay1={props.lineAutoplay1}
        lineIx2Target0={props.lineIx2Target0}
      />
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

function FooterHoverLine({
  lineWId,
  lineLarge,
  lineAutoplay1,
  lineIx2Target0
}: Pick<
  FooterNavLink,
  "lineWId" | "lineLarge" | "lineAutoplay1" | "lineIx2Target0"
>) {
  const lineClass = lineLarge ? "footer_link-line large" : "footer_link-line";
  const autoplay = lineAutoplay1 ? "1" : "0";
  const isIx2Target = lineIx2Target0 ? "0" : "1";
  const ix2Initial = lineIx2Target0 ? undefined : "0";
  return (
    <div
      className={lineClass}
      data-animation-type="lottie"
      data-autoplay={autoplay}
      data-default-duration="0"
      data-direction="1"
      data-duration="1.0010009602293968"
      data-is-ix2-target={isIx2Target}
      {...(ix2Initial !== undefined ? { "data-ix2-initial-state": ix2Initial } : {})}
      data-loop="0"
      data-renderer="svg"
      data-src={LINE_LOTTIE_SRC}
      data-w-id={lineWId}
    />
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
      <FooterHoverLine
        lineWId={props.lineWId}
        lineLarge={props.lineLarge}
        lineAutoplay1={props.lineAutoplay1}
        lineIx2Target0={props.lineIx2Target0}
      />
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

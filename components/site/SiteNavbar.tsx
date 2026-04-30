"use client";

import {
  NavbarLogoLink,
  NavbarMainLink
} from "@/components/site/shell-interactive";
import InteractiveLottieIcon, {
  type InteractiveLottieIconHandle
} from "@/components/site/InteractiveLottieIcon";
import PatternStrip from "@/components/site/PatternStrip";
import { navInfoBlocks, navLogo, navMainLinks } from "@/lib/site-shell-data";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

function NavbarInfoItem({
  block
}: {
  block: (typeof navInfoBlocks)[number];
}) {
  const iconRef = useRef<InteractiveLottieIconHandle | null>(null);
  const triggerIcon = () => iconRef.current?.playOnce();

  return (
    <LinkOrA
      href={block.href}
      onClick={triggerIcon}
      onFocus={triggerIcon}
      onMouseEnter={triggerIcon}
      onTouchStart={triggerIcon}
    >
      <div className={block.iconWrapClass}>
        <div className="navbar_info-icon">
          {block.iconType === "location" ? (
            <InteractiveLottieIcon
              ref={iconRef}
              size="location"
              src="/assets/lottie/location.lottie"
            />
          ) : (
            <InteractiveLottieIcon ref={iconRef} size="order" src="/assets/lottie/cookfree.lottie" />
          )}
        </div>
      </div>
      <div className="navbar_info-texts">
        <div className="navbar_info-text">{block.label}</div>
        <div className="navbar_info">{block.value}</div>
      </div>
    </LinkOrA>
  );
}

export default function SiteNavbar() {
  return (
    <div className="navbars">
      <nav aria-label="Main navigation" className="navbar">
        <div className="padding-global">
          <div className="container-medium">
            <div className="navbar_component">
              <div className="navbar_main">
                <NavbarLogoLink alt={navLogo.alt} href="/" src={navLogo.src} />
                <div className="navbar_links">
                  {navMainLinks.map((item) => (
                    <NavbarMainLink key={item.href} {...item} />
                  ))}
                </div>
              </div>
              <div className="navbar_infos">
                {navInfoBlocks.map((block) => (
                  <NavbarInfoItem key={block.href} block={block} />
                ))}
              </div>
              <div
                className="navbar_hamburger-wrap"
                data-w-id="9a3b798c-daff-c12d-dbef-1aaa741e672e"
              >
                <div className="navbar_hamburger">
                  <div className="navbar_hamburger-line _1"></div>
                  <div className="navbar_hamburger-line _2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <PatternStrip tone="black" />
    </div>
  );
}

function LinkOrA({
  href,
  children,
  onMouseEnter,
  onClick,
  onFocus,
  onTouchStart
}: {
  href: string;
  children: ReactNode;
  onMouseEnter?: () => void;
  onClick?: () => void;
  onFocus?: () => void;
  onTouchStart?: () => void;
}) {
  if (href.startsWith("tel:")) {
    return (
      <a
        className="navbar_info-block w-inline-block"
        href={href}
        onClick={onClick}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouchStart}
      >
        {children}
      </a>
    );
  }
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a
        className="navbar_info-block w-inline-block"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        onClick={onClick}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouchStart}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      className="navbar_info-block w-inline-block"
      href={href}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
    >
      {children}
    </Link>
  );
}

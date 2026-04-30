import {
  NavbarLogoLink,
  NavbarMainLink
} from "@/components/site/shell-interactive";
import { navInfoBlocks, navLogo, navMainLinks } from "@/lib/site-shell-data";
import Link from "next/link";
import type { ReactNode } from "react";

function NavbarInfoIcon({
  iconSrc,
  iconWId,
  duration
}: {
  iconSrc: string;
  iconWId: string;
  duration: string;
}) {
  return (
    <div
      className="navbar_info-icon"
      data-animation-type="lottie"
      data-autoplay="1"
      data-default-duration="0"
      data-direction="1"
      data-duration={duration}
      data-is-ix2-target="0"
      data-loop="1"
      data-renderer="svg"
      data-src={iconSrc}
      data-w-id={iconWId}
    />
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
                  <LinkOrA key={block.href} href={block.href}>
                    <div className={block.iconWrapClass}>
                      <NavbarInfoIcon
                        duration={block.iconDuration}
                        iconSrc={block.iconSrc}
                        iconWId={block.iconWId}
                      />
                    </div>
                    <div className="navbar_info-texts">
                      <div className="navbar_info-text">{block.label}</div>
                      <div className="navbar_info">{block.value}</div>
                    </div>
                  </LinkOrA>
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
      <div aria-hidden className="pattern black" />
    </div>
  );
}

function LinkOrA({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("tel:")) {
    return (
      <a className="navbar_info-block w-inline-block" href={href}>
        {children}
      </a>
    );
  }
  return (
    <Link className="navbar_info-block w-inline-block" href={href}>
      {children}
    </Link>
  );
}

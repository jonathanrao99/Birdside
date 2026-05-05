import Image from "next/image";
import Link from "next/link";
import PatternStrip from "@/components/site/PatternStrip";
import {
  FooterColumnLink,
  FooterLogoLink
} from "@/components/site/ShellInteractive";
import {
  footerInformationLinks,
  footerInfoBlocks,
  footerLocationLinks,
  footerQuickLinks,
  footerSocialLinks,
  footerTagline,
  navLogo
} from "@/lib/site-shell-data";

function getContactItems() {
  const block = footerInfoBlocks.find((b) => b.label === "Contact Us");
  return block?.body.kind === "links" ? block.body.items : [];
}

export default function SiteFooter() {
  const contactItems = getContactItems();

  return (
    <footer className="footer">
      <PatternStrip tone="black" />
      <div className="spacer-large"></div>
      <div className="padding-global">
        <div className="container-small">
          <div className="footer_component">
            <div className="footer_main birdside-footer-main">
              <div className="birdside-footer-columns">
                <div className="birdside-footer-col birdside-footer-col--brand">
                  <div className="footer_brand birdside-footer-brand-stack">
                    <FooterLogoLink alt={navLogo.alt} href="/" src={navLogo.src} />
                  </div>
                  <p className="birdside-footer-tagline">{footerTagline}</p>
                  <div className="footer_social-row birdside-footer-social">
                    {footerSocialLinks.map((s) => (
                      <a
                        key={s.href}
                        aria-label={s.label}
                        className="footer_legal-link footer_social-icon"
                        href={s.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Image
                          alt={s.label}
                          className="footer_social-icon-img"
                          height={18}
                          src={s.iconSrc}
                          unoptimized
                          width={18}
                        />
                      </a>
                    ))}
                  </div>
                </div>

                <nav className="birdside-footer-col" aria-label="Quick links">
                  <h2 className="birdside-footer-col-heading">Quick links</h2>
                  <ul className="birdside-footer-col-list">
                    {footerQuickLinks.map((item) => (
                      <li key={item.href}>
                        <FooterColumnLink {...item} />
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="birdside-footer-col">
                  <h2 className="birdside-footer-col-heading">Locations</h2>
                  <ul className="birdside-footer-col-list">
                    {footerLocationLinks.map((item) => (
                      <li key={item.href}>
                        <FooterColumnLink {...item} />
                      </li>
                    ))}
                  </ul>
                </div>

                <nav className="birdside-footer-col" aria-label="Information">
                  <h2 className="birdside-footer-col-heading">Information</h2>
                  <ul className="birdside-footer-col-list">
                    {footerInformationLinks.map((item) => (
                      <li key={item.label}>
                        <FooterColumnLink {...item} />
                      </li>
                    ))}
                    {contactItems.map((item) => (
                      <li key={item.href}>
                        <FooterColumnLink
                          href={item.href}
                          label={item.text}
                        />
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="footer_line footer_line--full" />
      <div className="birdside-footer-wordmark">
        <div className="birdside-footer-wordmark-top">
          <p className="birdside-footer-wordmark-legal">
            © 2026 Birdside HTX. All rights reserved.
          </p>
          <p className="birdside-footer-wordmark-credit">
            Created by{" "}
            <Link
              className="birdside-footer-wordmark-credit-link"
              href="https://sol3studio.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Sol3 Studio
            </Link>
          </p>
        </div>
        <div className="birdside-footer-wordmark-inner">
          <Image
            alt="Birdside"
            className="birdside-footer-wordmark-img"
            height={484}
            priority
            sizes="100vw"
            src="/assets/home/footer-decoration.png"
            width={2356}
          />
        </div>
      </div>
    </footer>
  );
}

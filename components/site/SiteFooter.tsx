import Image from "next/image";
import Link from "next/link";
import PatternStrip from "@/components/site/PatternStrip";
import {
  FooterLogoLink,
  FooterMainLink
} from "@/components/site/shell-interactive";
import {
  footerInfoBlocks,
  footerLinkGroups,
  footerSocialLinks,
  navLogo
} from "@/lib/site-shell-data";

const footerNavLinksFlat = footerLinkGroups.flat();

function FooterInfoBody({
  body
}: {
  body: (typeof footerInfoBlocks)[number]["body"];
}) {
  if (body.kind === "lines") {
    return (
      <p className="footer_info-text">
        {body.lines.map((line, i) => (
          <span key={`${i}-${line}`}>
            {i > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </p>
    );
  }

  if (body.kind === "link") {
    return (
      <p className="footer_info-text">
        <a
          className="footer_info-link"
          href={body.href}
          rel={body.external ? "noopener noreferrer" : undefined}
          target={body.external ? "_blank" : undefined}
        >
          {body.text}
        </a>
      </p>
    );
  }

  return (
    <p className="footer_info-text birdside-footer-contact-lines">
      {body.items.map((item, i) => (
        <span key={item.href}>
          {i > 0 ? <br /> : null}
          <a
            className="footer_info-link"
            href={item.href}
            rel={item.external ? "noopener noreferrer" : undefined}
            target={item.external ? "_blank" : undefined}
          >
            {item.text}
          </a>
        </span>
      ))}
    </p>
  );
}

export default function SiteFooter() {
  return (
    <footer className="footer">
      <PatternStrip tone="black" />
      <div className="spacer-large"></div>
      <div className="padding-global">
        <div className="container-small">
          <div className="footer_component">
            <div className="footer_main birdside-footer-main">
              <div className="birdside-footer-top">
                <div className="birdside-footer-brand-block">
                  <div className="footer_brand birdside-footer-brand-stack">
                    <FooterLogoLink alt={navLogo.alt} href="/" src={navLogo.src} />
                  </div>
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

                <nav aria-label="Footer navigation" className="birdside-footer-nav-row">
                  <div className="birdside-footer-links-single-row">
                    {footerNavLinksFlat.map((item) => (
                      <FooterMainLink key={item.href} {...item} />
                    ))}
                  </div>
                </nav>
              </div>

              <div
                className="footer_infos birdside-footer-infos-grid"
                id="w-node-_2da64e58-7a64-a03c-8c3f-856a365e0a09-365e09d4"
              >
                {footerInfoBlocks.map((info) => (
                  <div key={info.label} className="footer_info">
                    <p className="footer_info-label">{info.label}</p>
                    <FooterInfoBody body={info.body} />
                  </div>
                ))}
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
            src="/assets/footer.png"
            width={2356}
          />
        </div>
      </div>
    </footer>
  );
}

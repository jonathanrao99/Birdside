import Image from "next/image";
import Link from "next/link";
import {
  FooterLogoLink,
  FooterMainLink
} from "@/components/site/shell-interactive";
import {
  footerInfos,
  footerLinkGroups,
  footerSocialLinks,
  navLogo
} from "@/lib/site-shell-data";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div aria-hidden className="pattern white" />
      <div className="spacer-large"></div>
      <div className="padding-global">
        <div className="container-small">
          <div className="footer_component">
            <div className="footer_main">
              <div className="footer_brand">
                <FooterLogoLink alt={navLogo.alt} href="/" src={navLogo.src} />
                <div className="footer_brand-desc footer_social-icons footer_social-row">
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
              <div className="footer_links">
                <div className="footer_links-groups">
                  {footerLinkGroups.map((group, i) => (
                    <div key={i} className="footer_links-group">
                      {group.map((item) => (
                        <FooterMainLink key={item.href} {...item} />
                      ))}
                    </div>
                  ))}
                </div>
                <div
                  className="footer_infos"
                  id="w-node-_2da64e58-7a64-a03c-8c3f-856a365e0a09-365e09d4"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
                    gap: "20px",
                    alignItems: "start"
                  }}
                >
                  {footerInfos.map((info) => (
                    <div key={info.label} className="footer_info">
                      <p className="footer_info-label">{info.label}</p>
                      <p
                        className="footer_info-text"
                        style={{ lineHeight: 1.45, margin: 0 }}
                        dangerouslySetInnerHTML={{ __html: info.html }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="footer_line"></div>
            <div className="footer_legal-links">
              <div
                className="footer_legal-wrap"
                id="w-node-_2da64e58-7a64-a03c-8c3f-856a365e0a18-365e09d4"
              >
                <div className="footer_copyright">© 2026 Birdside HTX</div>
                <div className="footer_legal-divider"></div>
                <div className="footer_copyright">
                  {" "}
                  Created by{" "}
                  <Link
                    className="footer_legal-link"
                    href="https://sol3studio.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Sol3 Studio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

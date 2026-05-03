type Props = {
  html: string;
};

/** Isolated `/menu` testimonials HTML (first `section_testimonials` from inner main). */
export default function MenuPageLead({ html }: Props) {
  if (!html) return null;
  return <div className="menu-page-lead" dangerouslySetInnerHTML={{ __html: html }} />;
}

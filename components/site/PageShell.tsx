import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

type PageShellProps = {
  mainHtml: string;
};

export default function PageShell({ mainHtml }: PageShellProps) {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
      <Footer />
    </div>
  );
}

import type { ReactNode } from "react";
import styles from "./placeholder-doc.module.css";

type Props = {
  title: string;
  headingId?: string;
  children: ReactNode;
};

export default function PlaceholderDoc({ title, headingId, children }: Props) {
  return (
    <section
      className={styles.wrap}
      aria-labelledby={headingId ?? undefined}
    >
      <div className="padding-global">
        <div className={`container-small ${styles.inner}`}>
          <h1 id={headingId} className={styles.title}>
            {title}
          </h1>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </section>
  );
}

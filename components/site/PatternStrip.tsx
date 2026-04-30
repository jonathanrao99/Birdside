type PatternStripTone = "black" | "white";

export default function PatternStrip({ tone }: { tone: PatternStripTone }) {
  return <div aria-hidden className={`pattern pattern-strip ${tone}`} />;
}

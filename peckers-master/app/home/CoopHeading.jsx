export default function CoopHeading({
  heading = "OUR LOCATIONS",
  subtitle = "Experience our local vibe and flavour in person. Find your nearest Peckers below.",
}) {
  const words = (heading || "OUR LOCATIONS").split(" ");
  const subtitleText =
    subtitle ||
    "Experience our local vibe and flavour in person. Find your nearest Peckers below.";

  return (
    <div
      className="w-full px-[5vw] md:px-[1.4vw] pt-[10vw] md:pt-[8vw] lg:pt-[12vw] xl:pt-[5.5vw] pb-[5vw] md:pb-0 xl:pb-0 flex flex-col items-start text-left"
      style={{ lineHeight: "1.2" }}
    >
      {/* Title */}
      <h2
        className="text-[7.2vw] sm:text-[6.2vw] md:text-[4.8vw] lg:text-[3.3vw] font-bold text-white tracking-[.18vw] uppercase"
        style={{ fontFamily: "var(--font-peakers)" }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block mr-[2.5vw] md:mr-[0.6vw]">
            {word}
          </span>
        ))}
      </h2>

      {/* Subtitle */}
      <p className="font-sans mt-[9px] font-extralight text-[4vw] sm:text-[3vw] md:text-[2.2vw] lg:text-[1.3vw] text-white opacity-90 max-w-[90vw] md:max-w-none">
        {subtitleText}
      </p>
    </div>
  );
}

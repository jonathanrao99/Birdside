export default function HeaderActionButton({
  href,
  className = "",
  children,
  bgColor = "bg-black",
  textColor = "text-white",
  borderColor = "border-white",
  shimmerColor = "bg-white",
  wrapperClassName = "",
  onClick,
}) {
  return (
    <div
      className={`group relative inline-flex align-middle ${wrapperClassName}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 translate-x-[4px] translate-y-[4px] rounded-full ${shimmerColor} opacity-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-[6px] group-hover:translate-y-[6px]`}
      />

      <a
        href={href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        data-lenis-prevent
        onClick={onClick}
        className={`relative z-10 flex items-center justify-center text-center leading-none pb-[2px] rounded-full border-[0.15vw] ${borderColor} ${bgColor} ${textColor} transition-all duration-200 ease-out group-hover:-translate-x-[1px] group-hover:-translate-y-[1px] ${className}`}
      >
        {children}
      </a>
    </div>
  );
}

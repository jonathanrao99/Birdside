function onProductImgClick(e: MouseEvent): void {
  if (e.defaultPrevented || e.button !== 0) return;
  const target = e.target;
  if (!target || !(target instanceof Element)) return;
  const img = target.closest(".section_home-menu img.menu_img");
  if (!img) return;
  const row = img.closest(".menu_block-content");
  if (!row) return;
  const a = row.querySelector(
    "a.button-icon_component[href], a[href^=\"/product/\"]"
  ) as HTMLAnchorElement | null;
  const href = a?.getAttribute("href");
  if (!href) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  if (a) a.click();
}

export function setupHomeMenuProductImgNav(): () => void {
  document.addEventListener("click", onProductImgClick);
  return () => document.removeEventListener("click", onProductImgClick);
}

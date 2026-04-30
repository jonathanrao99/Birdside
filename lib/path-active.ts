/** Whether `href` should be treated as active for the current pathname. */
export function pathIsActive(pathname: string, href: string): boolean {
  if (href.startsWith("tel:") || href.startsWith("http")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

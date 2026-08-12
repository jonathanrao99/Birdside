export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const configuredIsInternal = configured
    ? /localhost|127\.0\.0\.1|\.vercel\.app/i.test(configured)
    : false;
  const url =
    configured && !configuredIsInternal
      ? configured
      : "https://birdsidehtx.com";

  return url.startsWith("http") ? url : `https://${url}`;
}

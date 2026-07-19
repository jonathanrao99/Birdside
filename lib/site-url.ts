export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const url =
    configured &&
    !(process.env.NODE_ENV === "production" && /localhost|127\.0\.0\.1/.test(configured))
      ? configured
      : process.env.VERCEL_PROJECT_PRODUCTION_URL ??
        process.env.VERCEL_URL ??
        "https://birdside.vercel.app";

  return url.startsWith("http") ? url : `https://${url}`;
}

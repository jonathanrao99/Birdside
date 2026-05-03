import { z } from "zod";

const legacyPageEntrySchema = z.object({
  route: z.string(),
  title: z.string(),
  description: z.string(),
  mainHtml: z.string()
});

export const siteContentSchema = z.object({
  global: z.object({
    siteName: z.string(),
    navbarHtml: z.string(),
    footerHtml: z.string(),
    ourMenuHtml: z.string().optional()
  }),
  routes: z.record(z.string(), legacyPageEntrySchema),
  products: z.record(z.string(), legacyPageEntrySchema),
  locations: z.record(z.string(), legacyPageEntrySchema)
});

export type SiteContentValidated = z.infer<typeof siteContentSchema>;

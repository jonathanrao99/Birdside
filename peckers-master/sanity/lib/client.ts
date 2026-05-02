import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  /**
   * Bypasses CORS by proxying client-side fetches through the local server.
   * This is necessary when the dev server is running on an unauthorized port (like 3001).
   */
  // @ts-ignore
  fetch: (url, options) => {
    if (typeof window !== "undefined") {
      const stringUrl = url.toString();
      // console.log(`[SanityClient] Fetching: ${stringUrl}`);
      if (stringUrl.includes("sanity.io")) {
        const proxiedUrl = stringUrl.replace(
          `https://${projectId}.api.sanity.io`,
          "/sanity-api",
        );
        return fetch(proxiedUrl, options);
      }
    }
    return fetch(url, options);
  },
});

import type { Config } from "@react-router/dev/config";

import { getPublishedSlugs } from "./app/utils/posts.server";

export default {
  ssr: false,
  appDirectory: "app",
  // Defaults to "/". For GitHub Project Pages, set e.g. "/blog-redux" via env.
  basename: process.env.RR_BASENAME ?? "/",
  prerender: async () => {
    const slugs = await getPublishedSlugs();
    return ["/", "/blog", ...slugs.map((slug) => `/${slug}`)];
  },
} satisfies Config;

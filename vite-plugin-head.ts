import type { Plugin } from "vite";
import { buildHeadHtml, buildRobotsTxt, buildSitemapXml } from "./src/config/Head.ts";

/**
 * Injects the SEO <head> into index.html and serves / emits sitemap.xml + robots.txt
 * in both development and production builds.
 *
 * The placeholder lives in index.html as:  <!--vite-head-->
 */
export function viteHeadPlugin(domain: string): Plugin {
  return {
    name: "maurel:vite-head",

    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html.replace("<!--vite-head-->", buildHeadHtml(domain));
      },
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?")[0];

        if (url === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.end(buildSitemapXml(domain));
          return;
        }

        if (url === "/robots.txt") {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(buildRobotsTxt(domain));
          return;
        }

        next();
      });
    },

    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: buildSitemapXml(domain),
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: buildRobotsTxt(domain),
      });
    },
  };
}

// Site settings for Multi-History Science. Internal links are built with `href()`, so the site
// can be served from a domain root (base "") or from a sub-path (e.g. base "/multihistory",
// as on arity.science). If you change `base`, set the same value as `base` in astro.config.mjs.
export const site = {
  name: "Multi-History Science",
  // Public address of the site, used for canonical links and the sitemap. Change it with the domain.
  url: "https://multihistory.github.io",
  base: "/website",
  description:
    "Multi-History Science: an independent collaboration among researchers who have worked on rewrite systems, hypergraphs, causality and emergent spacetime in connection to the Wolfram Physics Project, documenting and preserving their contributions.",
  // GitHub organisation; set to null to show the buttons as "coming soon" instead.
  github: "https://github.com/Multihistory" as string | null,
  // true keeps the site out of search engines (robots noindex, no canonical link).
  // Turn it off once the site is on its own domain and ready to be public.
  noindex: true,
  nav: [
    { label: "Contributions", href: "/#contributions" },
    { label: "People", href: "/#people" },
    { label: "Projects", href: "/#projects" },
    { label: "Timeline", href: "/timeline/" },
    { label: "Resources", href: "/#resources" },
    { label: "Statements", href: "/statements/" },
  ],
};

/** Prefixes a site-relative path ("/timeline/", "/#people") with the current base. */
export const href = (path: string) => site.base + path;

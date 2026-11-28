// Site settings for Multihistory Science. Internal links are built with `href()`, so the site
// can be served from a domain root (base "") or from a sub-path (e.g. base "/multihistory",
// as on arity.science). If you change `base`, set the same value as `base` in astro.config.mjs.
export const site = {
  name: "Multihistory Science",
  // Public address of the site, used for canonical links and the sitemap. Change it with the domain.
  url: "https://multihistory.org",
  base: "",
  description:
    "An independent collaboration among researchers who have worked on rewrite systems, hypergraphs, causality, and emergent spacetime in connection with the Wolfram Physics Project. Its purpose is to document and preserve their contributions, support continued collaboration and networking, and coordinate possible future independent research in related directions.",
  // GitHub organisation. Set to null to hide its navigation link.
  github: "https://github.com/Multihistory" as string | null,
  // true keeps the site out of search engines (robots noindex, no canonical link).
  // Turn it off once the site is on its own domain and ready to be public.
  noindex: true,
  disclaimer:
    "The collaboration grew out of research connections made through the Wolfram Institute but is not affiliated with, or endorsed by, Wolfram Research, the Wolfram Foundation, the Wolfram Institute or Stephen Wolfram.",
  nav: [
    { label: "Guides", href: "/#research" },
    { label: "Timeline", href: "/#timeline" },
    { label: "People", href: "/#people" },
    { label: "Hyperseminar", href: "/#hyperseminar" },
    { label: "Resources", href: "/resources/", id: "resources" },
  ],
};

/** Prefixes a site-relative path ("/timeline/", "/#people") with the current base. */
export const href = (path: string) => site.base + path;

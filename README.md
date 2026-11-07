# Multi-History Science

Source for https://multihistory.org, maintained in https://github.com/Multihistory/website.
The supplied Astro design comes from the original ZIP, retained in Git history.
The initial text is synchronized with https://arity.science/multihistory/ and its timeline and statements pages.
The standalone repository is the maintained source after deployment. The Arity copy is not changed here.

## Editing

Read [AGENTS.md](AGENTS.md) before changing content. Preserve attribution, evidence links and personal statements verbatim.

Use Node 22.12 or newer. CI uses Node 22.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Content lives in `src/data/`: people, timeline, streams, projects, resources and personal statements.
Page introductions are in `src/pages/`; shared header and footer text is in `src/layouts/Layout.astro`.
Site settings are in `src/data/site.ts`: URL `https://multihistory.org`, empty base, `noindex: true`.
Do not enable indexing without an explicit request. No sitemap or canonical links are generated while noindex is enabled.

Before publishing, build successfully and inspect all changed pages at 1280px and 390px, including timeline filters, statement anchors and horizontal overflow.

## GitHub Pages

`.github/workflows/deploy.yml` builds with `npm ci` and `npm run build`, uploads `dist/`, and deploys through GitHub Pages on pushes to `main`. It can also be run manually from Actions.
In repository Settings → Pages, use **GitHub Actions** as the source and `multihistory.org` as the custom domain.
Actions deployments use the domain in Pages settings; a CNAME file is not required.
The repository homepage is https://multihistory.org.

GitHub Pages requires either a public repository or a GitHub plan supporting Pages for private repositories.

## Domain setup

DNS is hosted at Porkbun. On 7 November 2026, the apex A records were Porkbun parking addresses:
`207.207.210.36`, `207.207.210.23`, `207.207.210.50`. No apex AAAA records were returned.

After configuring the custom domain in GitHub Pages, replace only those apex parking A records with:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Optional IPv6 records:

| Type | Name | Value |
| --- | --- | --- |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |

Preserve MX, TXT, verification records and unrelated subdomains. No www alias is configured initially.
See [GitHub's custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
After DNS propagates and GitHub provisions the certificate, enable **Enforce HTTPS** in Pages settings and verify the home, timeline and statements pages over HTTPS.

```sh
dig +short multihistory.org A
dig +short multihistory.org AAAA
gh api repos/Multihistory/website/pages
```

`public/_headers` is inherited from the original host; GitHub Pages does not apply that file. Search exclusion is also emitted in HTML meta tags.

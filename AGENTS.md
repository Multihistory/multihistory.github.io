# Context for AI agents editing this website

Read this whole file before changing anything. It is written for any AI agent or developer, not a specific tool.

## 1. What this site is

**Multi-History Science** is an independent record of a research collaboration. Its members worked on the foundational, technical and mathematical aspects of the Wolfram Physics Project (WPP). The site documents who originated which streams of ideas, using public evidence (code, papers, bulletins, recordings, credits) and the members' own personal statements.

The owner's stated purpose, to keep in mind on every edit: *the goal is not to appropriate anything from the Wolfram Physics Project. It is to identify who originated particular streams of ideas, reflect it, and keep that record in a place that is independent of the Wolfram Physics Project.*

- **Owner and editor:** Carlos Zapata-Carratalá (https://zapatacarratala.me).
- **Members:** Carlos Zapata-Carratalá, Max Piskunov, Xerxes Arsiwalla, Nikolay (Nik) Murzin, Utkarsh Bajaj, Pavel Hajek, Richard Assar. Others who worked on the project's foundations may join.
- **GitHub organisation:** https://github.com/Multihistory
- **History:** the site began as a prototype at https://arity.science/multihistory/, inside the monorepo `Zaphyz/websites` (folder `sites/arity`, files under `src/**/multihistory*`). This package is a standalone copy of that prototype as of 4 November 2026, for hosting on the site's own domain. Once this copy is deployed, treat it as the source of truth. The arity.science copy can then be removed, or replaced with redirects (one `_redirects` line per URL).

## 2. Editorial rules (most important)

1. **Every claim needs a source or a statement.** Each timeline entry carries public evidence (`sources`) and/or a member's personal statement (`statement`). Never add a date, credit or attribution without one. If something cannot be verified, leave it out or say plainly that it rests on a member's account ("By Pavel's account, …").
2. **Be conservative about origination.** Distinguish *originator* from *principal developer*, *co-developer*, *implementer* and *participant*. Examples already decided:
   - Max wrote SetReplace and originated local multiway systems. He did **not** originate causal graphs, which predate him.
   - Xerxes co-developed the homotopy-type framing with Jonathan Gorard. Gorard co-authored every one of those papers, so do not claim sole origination.
   - Several of Nik's packages are officially credited to "Wolfram Research", so describe him as "principal code author per the public commit history", not "creator".
3. **Personal statements are verbatim.** Files in `src/data/statements/` hold members' own words. Never edit them unless the member, or the owner on their behalf, asks. Fix only obvious transcription errors, and tell the owner.
4. **Neutral, factual, low-legal-risk wording** about any dispute, departure or decision by Stephen Wolfram or Wolfram organisations. The owner asked for this explicitly. Write "his position at the Wolfram Foundation ended", not "he was removed"; write "that collaboration ended", not reasons attributed to others. No characterisations of other people's contributions (e.g. "tangential") or motives.
5. **No Wolfram branding.** Use no logos, trade dress or names as branding. "Wolfram Physics Project" appears only to identify the project being documented. Keep the footer disclaimer: "Not affiliated with, or endorsed by, Wolfram Research, the Wolfram Institute or Stephen Wolfram."
6. **People's profile links** (`people.json` → `href`) go to a personal or institutional page, GitHub, ORCID or Google Scholar. Never use a single paper or a Wolfram site. Wolfram sites are fine as *evidence* links in the timeline.
7. **Spelling of names** (the owner sometimes dictates, and speech-to-text garbles names):
   - Xerxes Arsiwalla (not "Arslewala")
   - Jonathan Gorard (not "Godard")
   - Nikolay Murzin, or "Nik" (not "Nick Merson")
   - Richard Assar (not "Tassar")
   - Nicolas Behr (CNRS / IRIF; not "Nicholas Baer")
   - Josh Grochow (formally Joshua A. Grochow, CU Boulder)
   - Alexander (Alex) Kolpakov (University of Austin)
   - Marzke–Wheeler (not "Wheeler-Marske")
   - "hypergraph rewriting" (not "hypergraphic writing")
   - "Arity Science" (not "ret science")

## 3. Tech stack and commands

- [Astro](https://astro.build) 7, a static site with no client framework. Node 22 or newer.
- Fonts come from Fontsource packages: Source Serif 4 (headings), Source Sans 3 (body), Source Code Pro (mono).
- `npm install`, then `npm run dev` (local server), `npm run build` (output in `dist/`), `npm run preview`.
- Pushes to `main` deploy `dist/` through GitHub Actions to GitHub Pages at https://multihistory.org. See README.md for DNS and deployment details. `public/_headers` is inherited from the original host and is not applied by GitHub Pages.
- **Before publishing:**
  - `npm run build` must succeed.
  - Check every changed page at 1280px and 390px wide. There must be no horizontal scroll at 390px.

## 4. File map

```
src/data/site.ts          name, url, base path, GitHub org, noindex, nav
src/data/people.json      members
src/data/timeline.json    every timeline entry (detailed page; `key` entries also on the home page)
src/data/streams.json     "Streams of ideas at a glance" cards on the home page
src/data/projects.json    "Active projects" cards
src/data/resources.json   "Code and tools" cards
src/data/statements/*.md  personal statements, one file per member (verbatim)
src/pages/index.astro     home: hero, contributions, people, projects, timeline summary, resources
src/pages/timeline.astro  detailed timeline with person filter (?person=<slug>)
src/pages/statements.astro all statements, anchored by slug (#pavel-hajek)
src/layouts/Layout.astro  header, nav, footer (disclaimer), meta tags, noindex
src/components/Timeline.astro       timeline drawn as a causal-graph spine
src/components/MultiwayGraph.astro  build-time SVG multiway graph (hero illustration)
src/lib/multiway.ts       string-rewriting multiway graph and layered layout
src/lib/multihistory.ts   data helpers: people, photos, statements, timeline sorting, link()
src/styles/global.css     palette, fonts, shared classes; reset.css and scale.css are generic
src/assets/*.jpg          member photos (resized at build by astro:assets)
public/favicon.svg, public/_headers
```

## 5. Data formats

**Person** (`people.json`, in display order):

```json
{ "slug": "pavel-hajek", "name": "Pavel Hajek", "href": "https://p135246.github.io/",
  "photo": "Pavel.jpg", "color": "#3a72b8", "focus": "one-line description of their contributions" }
```

`photo` is a file in `src/assets/`, or `null` to show initials. `href` may be `""`, which shows the name unlinked (currently the case for Utkarsh Bajaj, who has no verified profile page). `color` identifies the person in the timeline dots and cards; keep it distinct from the others.

**Timeline entry** (`timeline.json`; sorted by date when rendered, oldest first):

```json
{ "date": "2025-01-16", "type": "Course", "people": ["pavel-hajek", "carlos-zapata-carratala"],
  "html": "One or two factual sentences; inline <a>, <code> allowed.",
  "sources": [{ "label": "Project", "href": "https://…" }],
  "statement": "pavel-hajek", "key": true }
```

- `date` is `YYYY-MM-DD`, `YYYY-MM` or `YYYY`. A year-only date sorts at the start of its year, so prefer a month.
- `type` is free text. In use: Code, Paper, Bulletin, Talk, Livestream, Course, Credit, Role, Grant, Event, Post, Idea, Statement, Milestone.
- `statement` is a slug or a list of slugs; it adds "X's statement" links.
- `key: true` also shows the entry in the home-page summary. Keep that summary to about 20–25 entries.
- `context: true` with `people: []` marks a milestone of the WPP itself, drawn as a grey hollow node and toggled by the "Project milestones" checkbox.

**Stream** (`streams.json`): `{ "title", "years", "people": [slugs], "html", "evidence": [ {label, href} ] }`.

**Project** (`projects.json`): `{ "title", "status", "people", "html", "links" }`. `status` is free text, e.g. "Concluding", "Paper in preparation", "Ongoing".

**Resource** (`resources.json`): `{ "name", "kind", "people", "href", "html" }`.

**Statement** (`statements/<slug>.md`): front matter `person: <slug>`, `received: YYYY-MM-DD`, and an optional `note:` that is shown next to the date (e.g. "Initial notes, to be expanded."). The body is Markdown. People without a statement are listed as "Statements forthcoming from …".

**Internal links in data files** are written `~/path`, e.g. `~/statements/#pavel-hajek` or `~/timeline/?person=max-piskunov`. `link()` resolves them against `site.base`, so they keep working if the site moves under a sub-path. In `.astro` files, build internal links with `href("/path")` from `src/data/site.ts`.

## 6. Visual design

The style is a light "computational notebook" look inspired by the general graphic language of multiway and causal graph diagrams. It is deliberately different from Arity Science, and it carries no Wolfram branding.

- **Tokens** (in `global.css`):
  - paper `#fcfbf7`, panel `#ffffff`, ink `#1f2430`, muted `#5f6774`, rule `#e4e0d4`
  - state boxes: pale yellow `#fff3cc` with border `#d4a72c`
  - multiway arrows: grey-blue `#7a879f`
  - accent / causal orange `#d4651c`, branch green `#4c8a58`, links `#24589a`
- The site is light only.
- "Cells" (`.cell`) are white cards with a thin warm border. Section labels (`.label`) are orange monospace with a dot.
- **Hero:** the multiway graph of the string rewriting rules `{AB → BBA, A → B}` from `AAB`, which branches and then merges into a single final state ("many histories, one outcome"). It is computed at build time in `src/lib/multiway.ts`, and its layers fade in with CSS only.
- **Logo** (header and favicon): four state boxes forming a branch-and-merge diamond, with a dashed orange line between the two middle boxes.
- **Motion:** keep it subtle and CSS-only, and respect `prefers-reduced-motion` (handled globally). The only client script is the person filter on the timeline page.

## 7. Decisions already made with the owner (do not undo without asking)

- **Name:** the site is "Multi-History Science", with a hyphen.
- **Search engines:** it is `noindex` while it is a prototype (`site.noindex`); with `noindex` on, there is no sitemap and no canonical link. Turn it off only when the owner says the site is public on its own domain.
- **Carlos's statement:**
  - transcription errors in names and terms were corrected; otherwise it is his wording;
  - the passages about the end of his collaboration with Stephen Wolfram and of his position at the Wolfram Foundation were softened, at the owner's request, to neutral facts;
  - the phrase "often in a tangential way" (about Jonathan Gorard) was removed at his request.
- **Pavel's statement:**
  - it replaced an earlier set of notes, which were deleted together with three "Proposed" projects derived from them;
  - one sentence was revised with Pavel's agreement. It now reads: "The 'dictionary' was Carlos's initial vision for the project, which Stephen supported, and Stephen also made valuable suggestions for the functionality of the paclet."
- **Infrageometry attribution:**
  - the "dictionary" of differential geometry on discrete combinatorial structures was Carlos's initial vision (2023, in discussion with Xerxes Arsiwalla and Jonathan Gorard), and Stephen Wolfram supported it;
  - Carlos and Wolfram came to differ on the approach and its mathematical foundations, and that collaboration ended around June 2024;
  - from October 2025 Pavel developed infrageometry with Wolfram, on Wolfram's vision of emergent spacetime;
  - "infracalculus" and "infrageometry" appear in Wolfram's writings as his terms.
- **Pavel's role** is "research fellow" in the timeline (his CV title); Carlos's statement says "postdoc". Both stand.
- **Gorard** is mentioned as a co-author and collaborator, not listed as a member.
- **Grant:** the Templeton grant 63655 page names Carlos Zapata-Carratalá and Stephen Wolfram as project leaders. The co-investigators (Behr, Grochow, Kolpakov) come from Carlos's statement; the public grant page does not name them.

## 8. Verification status and known gaps

- **YouTube upload dates could not be checked automatically**; the site's dates for the Wolfram Institute livestreams come from the owner's earlier data. If you can open YouTube, verify:
  - `CY9ZwYiftxA` (2023-09-12), `93ZZFGYltgM` (2023-09-19), `NdlDlcK78_g` (2023-09-27)
  - `IggArVlZR_k` (2024-10-25), `gLUEcUj3gn0` (2024-10-28)
  - `pRnj-4I6Hc0` (2025-11-11)
  - `27jGLskGDdY` (2025-03-18; Pavel's CV says April 2025)
- **Utkarsh Bajaj:** Carlos recalls working with him at a winter school where Utkarsh did a project on discrete difference operators on graphs. The only matching public record is the 2025 Winter School, where Utkarsh co-mentored a project on vector fields on graphs and their derivations. He has no verified profile link.
- **Xerxes and the infrageometry working sessions:** he is not listed on the 2023 "Research Working Session: Infrageometry" livestreams; his part in the idea's beginnings rests on Carlos's statement.
- **Richard Assar:** there is no evidence of involvement in the 2019–2020 founding work. His record starts with a January 2022 Winter School project.
- **Max Piskunov** has no photo. Do not use the file named `Max.jpg` from the arity.science repository: it is Max Schich, a different person.
- **`MultiwayGeneralizedShift`** (Pavel) needs a login on the Function Repository, so it rests on his statement. `GromovHausdorffDistance` is publicly credited to him.

## 9. Open tasks

- Collect personal statements from Max, Xerxes, Nik, Utkarsh and Richard. Add each as `src/data/statements/<slug>.md`, then link timeline entries to it with `statement` where it adds information.
- The public domain in `src/data/site.ts` is `https://multihistory.org`, with an empty base path.
- When the owner says so, set `noindex: false`. That re-enables the sitemap and canonical links.
- Active projects (`projects.json`) are a draft confirmed by the owner. Update them as members report.

## 10. Checklist for an edit

1. Change data files rather than page markup wherever possible.
2. Back every new claim with `sources` or `statement`; check that each URL opens and says what you claim.
3. Keep statements verbatim and keep the wording neutral (sections 2 and 7).
4. `npm run build`, then look at the changed pages at 1280px and 390px.
5. If a URL changes or disappears, add a redirect for it on the host (e.g. a line in `public/_redirects` on Cloudflare Pages or Netlify).

## Administration update — 7 November 2026

The initial migration uses the current Arity home, timeline and statements pages for textual content, preserving this package's design. The website repository is the maintained standalone source. Keep `noindex: true` until explicitly asked otherwise. The original ZIP remains in Git history.

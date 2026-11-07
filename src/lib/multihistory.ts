// Data access for the pages (src/data/).
import type { ImageMetadata } from "astro";
import peopleData from "../data/people.json";
import timelineData from "../data/timeline.json";
import { href } from "../data/site";

export interface Link { label: string; href: string }
export interface Person { slug: string; name: string; href: string; photo: string | null; color: string; focus: string }
export interface Entry {
  date: string;          // YYYY-MM-DD, YYYY-MM or YYYY
  type: string;
  people: string[];      // person slugs; [] for context entries
  html: string;
  sources: Link[];       // public evidence
  statement?: string | string[]; // slug(s) of the personal statement(s) this entry draws on
  key?: boolean;         // also shown in the summary on the home page
  context?: boolean;     // a milestone of the Wolfram Physics Project itself, for orientation
}

const photos = import.meta.glob<{ default: ImageMetadata }>("../assets/*.{jpg,png}", { eager: true });
export const photo = (file: string | null) => (file ? photos[`../assets/${file}`]?.default : undefined);

export const people = peopleData as Person[];
export const person = (slug: string) => people.find((p) => p.slug === slug);

const statementFiles = import.meta.glob("../data/statements/*.md", { eager: true }) as Record<string, any>;
export const statements = Object.values(statementFiles)
  .map((m) => ({ slug: m.frontmatter.person as string, received: m.frontmatter.received as string, note: m.frontmatter.note as string | undefined, Content: m.Content }))
  .sort((a, b) => people.findIndex((p) => p.slug === a.slug) - people.findIndex((p) => p.slug === b.slug));
export const hasStatement = (slug: string) => statements.some((s) => s.slug === slug);

/** The statement slugs an entry draws on, as a list. */
export const statementsOf = (e: Entry) => (e.statement ? [e.statement].flat() : []);

/** Oldest first: it reads as a history. */
export const timeline = (timelineData as Entry[]).slice().sort((a, b) => a.date.localeCompare(b.date));

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2024-06-21" → "21 Jun", "2024-06" → "Jun", "2024" → "". */
export function shortDate(d: string) {
  const [, m, day] = d.split("-");
  if (!m) return "";
  return day ? `${+day} ${MONTHS[+m - 1]}` : MONTHS[+m - 1];
}

/** Data files write links within Multi-History Science as "~/path"; they resolve against the current base. */
export const link = (url: string) => (url.startsWith("~/") ? href(url.slice(1)) : url);

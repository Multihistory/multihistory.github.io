import openingCover from "../assets/home/hyperseminar-0.jpg";
import arityCover from "../assets/home/hyperseminar-1.jpg";
import kickoffCover from "../assets/home/hyperseminar-2.jpg";
import geometryCover from "../assets/home/emergent-geometry.jpg";
import spacetimeCover from "../assets/home/emergent-spacetime.jpg";

export const initialSeminars = [
  { number: 0, title: "Opening session", label: "Hyperseminar #0", videoId: "7yZdt7J2mkc", cover: openingCover },
  { number: 1, title: "Arity Science Findings", label: "Hyperseminar #1 · Carlos Zapata-Carratalá", videoId: "7u6_pvzH_qA", cover: arityCover },
  { number: 2, title: "Kick-Starting Multi-History Science", label: "Hyperseminar #2 · Pavel Hájek", videoId: "ssW5TOolokQ", cover: kickoffCover },
] as const;

export const home = {
  projectName: "Wolfram Physics Project",
  projectUrl: "https://www.wolframphysics.org/",
  introduction: "A collaboration of independent researchers who met through their work around the",
  purpose: "This website records their statements and contributions and provides guides and resources.",
  arityUrl: "https://arity.science/",
  youtube: "https://www.youtube.com/@MultiHistoryScience/streams",
  people: [
    "pavel-hajek",
    "max-piskunov",
    "carlos-zapata-carratala",
    "richard-assar",
    "utkarsh-bajaj",
    "xerxes-arsiwalla",
  ],
  milestones: [
    { date: "2018-10-07", label: "First SetReplace commit", href: "https://github.com/maxitg/SetReplace/commit/29778d8dda29b69e33a00e9c9cf7ed062699ae0b" },
    { date: "2023-09-12", label: "Infrageometry live sessions", href: "https://www.youtube.com/watch?v=CY9ZwYiftxA" },
    { date: "2025-06-04", label: "Causality, Observers and Computation grant", href: "https://www.templeton.org/grant/causality-observers-and-computation-a-new-approach-to-fundamental-physics-and-metamathematics" },
    { date: "2026-11-02", label: "Multi-History Science begins", href: "~/timeline/" },
  ],
  seminars: [...initialSeminars].reverse(),
  guideCovers: {
    spacetime: spacetimeCover,
    geometry: geometryCover,
    physics: null,
  },
};

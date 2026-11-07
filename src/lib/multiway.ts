// Builds the multiway graph of a string rewriting system and lays it out in layers,
// for the Multi-History Science illustrations. Everything runs at build time.

export type Rule = [string, string];
export interface MwNode { id: string; layer: number; x: number; y: number }
export interface MwEdge { from: string; to: string; layer: number }

/** All one-step rewrites of `s` (every rule at every position). Duplicates are kept as separate edges. */
function successors(s: string, rules: Rule[]): string[] {
  const out: string[] = [];
  for (const [lhs, rhs] of rules) {
    for (let i = s.indexOf(lhs); i !== -1; i = s.indexOf(lhs, i + 1)) {
      out.push(s.slice(0, i) + rhs + s.slice(i + lhs.length));
    }
  }
  return out;
}

/**
 * States reached in `steps` steps from `init`, each placed in the layer where it first appears.
 * Identical states are merged, which is what makes histories branch and recombine.
 */
export function multiway(rules: Rule[], init: string, steps: number, maxLen = 9) {
  const layerOf = new Map<string, number>([[init, 0]]);
  const layers: string[][] = [[init]];
  const edges: MwEdge[] = [];
  const seenEdge = new Set<string>();
  for (let d = 0; d < steps; d++) {
    const next: string[] = [];
    for (const s of layers[d]) {
      for (const t of successors(s, rules)) {
        if (t.length > maxLen) continue;
        if (!layerOf.has(t)) { layerOf.set(t, d + 1); next.push(t); }
        const k = `${s}>${t}`;
        if (!seenEdge.has(k)) { seenEdge.add(k); edges.push({ from: s, to: t, layer: d }); }
      }
    }
    if (!next.length) break;
    layers.push(next);
  }
  // Order each layer by the mean position of its parents (a few barycentre sweeps).
  const pos = new Map<string, number>();
  layers.forEach((l) => l.forEach((s, i) => pos.set(s, (i + 0.5) / l.length)));
  for (let sweep = 0; sweep < 6; sweep++) {
    for (let d = 1; d < layers.length; d++) {
      const bary = (s: string) => {
        const ps = edges.filter((e) => e.to === s && layerOf.get(e.from)! < d).map((e) => pos.get(e.from)!);
        return ps.length ? ps.reduce((a, b) => a + b, 0) / ps.length : pos.get(s)!;
      };
      layers[d].sort((a, b) => bary(a) - bary(b) || a.localeCompare(b));
      layers[d].forEach((s, i) => pos.set(s, (i + 0.5) / layers[d].length));
    }
  }
  return { layers, edges, layerOf };
}

/** Layer-by-layer layout in a `w` × `h` box; layers run top to bottom. */
export function layout(rules: Rule[], init: string, steps: number, w: number, h: number, maxLen?: number) {
  const { layers, edges } = multiway(rules, init, steps, maxLen);
  const nodes: MwNode[] = [];
  const widest = Math.max(...layers.map((l) => l.length));
  layers.forEach((l, d) => {
    const y = layers.length === 1 ? h / 2 : (d / (layers.length - 1)) * h;
    // Narrow layers are centred rather than stretched across the full width.
    const span = w * Math.min(1, (l.length + 0.6) / (widest + 0.6));
    l.forEach((s, i) => nodes.push({ id: s, layer: d, x: (w - span) / 2 + ((i + 0.5) / l.length) * span, y }));
  });
  return { nodes, edges, layers: layers.length };
}

import type { ChartPoint, Earthquake } from '../types/earthquake';

export const validNumber = (v: number | null): v is number =>
  typeof v === 'number' && Number.isFinite(v);

export function getDailyCounts(events: Earthquake[]): ChartPoint[] {
  const counts = new Map<string, number>();
  events.forEach((e) => {
    if (e.time && !Number.isNaN(Date.parse(e.time))) {
      const day = e.time.slice(0, 10);
      counts.set(day, (counts.get(day) ?? 0) + 1);
    }
  });
  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))
    .map(([label, value]) => ({ label, value }));
}

export function getMagnitudeCounts(events: Earthquake[]): ChartPoint[] {
  const bins = [0, 0, 0, 0, 0, 0];
  events.forEach(({ mag }) => {
    if (!validNumber(mag)) return;
    const index = mag < 1 ? 0 : mag < 2 ? 1 : mag < 3 ? 2 : mag < 4 ? 3 : mag < 5 ? 4 : 5;
    bins[index]++;
  });
  return ['< 1', '1–1.9', '2–2.9', '3–3.9', '4–4.9', '≥ 5'].map((label, i) => ({ label, value: bins[i] }));
}

export function getDepthCounts(events: Earthquake[]): ChartPoint[] {
  const bins = [0, 0, 0];
  events.forEach(({ depth }) => {
    if (!validNumber(depth)) return;
    bins[depth < 70 ? 0 : depth < 300 ? 1 : 2]++;
  });
  return ['Superficiales (<70 km)', 'Intermedios (70–299 km)', 'Profundos (≥300 km)']
    .map((label, i) => ({ label, value: bins[i] }));
}

export function getKpis(events: Earthquake[]) {
  const mags = events.map((e) => e.mag).filter(validNumber);
  const depths = events.map((e) => e.depth).filter(validNumber);
  return {
    total: events.length,
    maxMag: mags.length ? Math.max(...mags) : null,
    avgDepth: depths.length ? depths.reduce((a, b) => a + b, 0) / depths.length : null,
  };
}

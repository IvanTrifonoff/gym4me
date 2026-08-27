import { bodyweightPoints } from './bodyweight-model.js';

export function bodyweightSeries(state, period = 0, now = Date.now()) {
  const cutoff = period ? now - period * 86400000 : -Infinity;
  return bodyweightPoints(state).filter(point => {
    const time = Date.parse(point.d + 'T00:00:00Z');
    return Number.isFinite(time) && time >= cutoff;
  });
}

export function chartPoints(points, width = 320, height = 120) {
  if (!points.length) return '';
  const values = points.map(point => point.w);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return points.map((point, index) => {
    const x = points.length === 1 ? width / 2 : index * width / (points.length - 1);
    const y = height - ((point.w - min) / span) * (height - 16) - 8;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

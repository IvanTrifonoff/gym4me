const MAX_WEIGHT_KG = 500;

export function normalizeBodyweightPoint(point) {
  if (!point) return null;
  const weight = Number(point.w ?? point.weight);
  const date = String(point.d ?? point.date ?? point.t ?? '').slice(0, 10);
  if (!Number.isFinite(weight) || weight <= 0 || weight > MAX_WEIGHT_KG || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  return { w: Math.round(weight * 10) / 10, d: date };
}

export function bodyweightPoints(state) {
  return (state?.bodyweight || [])
    .map(normalizeBodyweightPoint)
    .filter(Boolean)
    .sort((a, b) => a.d.localeCompare(b.d));
}

export function addBodyweight(state, point) {
  const normalized = normalizeBodyweightPoint(point);
  if (!normalized) throw new Error('invalid bodyweight');
  const points = bodyweightPoints(state).filter(item => item.d !== normalized.d);
  return [...points, normalized].sort((a, b) => a.d.localeCompare(b.d));
}

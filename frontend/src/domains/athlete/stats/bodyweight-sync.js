import { apiRequest } from '../../../shared/api/client.js';
import { addBodyweight, bodyweightPoints } from './bodyweight-model.js';

export function mergeBodyweight(local, remote) {
  const byDate = new Map(bodyweightPoints({ bodyweight: local }).map(point => [point.d, point]));
  for (const point of bodyweightPoints({ bodyweight: remote })) byDate.set(point.d, point);
  return [...byDate.values()].sort((a, b) => a.d.localeCompare(b.d));
}

export async function loadBodyweight(state) {
  try {
    const remote = await apiRequest('/api/v1/athlete/bodyweight');
    return Array.isArray(remote) ? mergeBodyweight(state?.bodyweight, remote) : bodyweightPoints(state);
  } catch {
    return bodyweightPoints(state);
  }
}

export async function saveBodyweight(state, point, update) {
  const next = addBodyweight(state, point);
  try {
    const saved = await apiRequest('/api/v1/athlete/bodyweight', { method: 'POST', body: JSON.stringify(point) });
    await update({ bodyweight: mergeBodyweight(next, [saved]) });
  } catch {
    await update({ bodyweight: next });
  }
  return next;
}

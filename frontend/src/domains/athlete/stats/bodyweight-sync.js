import { apiRequest } from '../../../shared/api/client.js';
import { addBodyweight, bodyweightPoints } from './bodyweight-model.js';

export async function loadBodyweight(state) {
  try {
    const points = await apiRequest('/api/v1/athlete/bodyweight');
    return Array.isArray(points) ? points : bodyweightPoints(state);
  } catch {
    return bodyweightPoints(state);
  }
}

export async function saveBodyweight(state, point, update) {
  const next = addBodyweight(state, point);
  try {
    await apiRequest('/api/v1/athlete/bodyweight', {
      method: 'POST',
      body: JSON.stringify(point),
    });
  } catch {
    // Keep the local state as the durable offline fallback.
  }
  await update({ bodyweight: next });
  return next;
}

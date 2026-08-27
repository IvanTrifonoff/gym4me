export const ATHLETE_SETTINGS_DEFAULTS = Object.freeze({
  unit: 'kg',
  restSec: 90,
  sound: true,
  keepAwake: true,
  lang: 'en',
  theme: 'dark',
  accent: 'lime',
  body: 'male',
  targetW: null,
  gifSize: 'full',
  effort: null,
  reminder: { on: false, time: '08:00', tz: null }
});

export const ATHLETE_STATE_KEYS = Object.freeze([
  'unit', 'restSec', 'sound', 'keepAwake', 'lang', 'theme', 'accent', 'body', 'targetW',
  'bodyweight', 'routines', 'week', 'dayPlan', 'exWeights', 'workouts', 'active', 'customEx',
  'gifSize', 'effort', 'reminder'
]);

export function athleteStateDto(state = {}) {
  const result = {};
  for (const key of ATHLETE_STATE_KEYS) if (key in state) result[key] = state[key];
  return result;
}

export function athleteProfileDto(profile) {
  return { id: profile.id, name: profile.name, createdAt: profile.createdAt ?? null };
}

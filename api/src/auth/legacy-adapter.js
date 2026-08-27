import { athleteActor } from './actor.js';
import { parseSession } from './sessions.js';

export function legacyCookieName(actorType) {
  return actorType === 'athlete' ? 'gymsid' : 'adminsid';
}

export function resolveLegacyActor({ cookies = {}, secret, now = Date.now() }) {
  const athlete = parseSession(cookies.gymsid, secret, now);
  if (athlete?.actorType === 'athlete') return athleteActor(athlete.actorId);
  return null;
}

export function legacyStateKey(athleteId) {
  const safe = String(athleteId).replace(/[^a-zA-Z0-9_-]/g, '');
  return `state-${safe}.json`;
}

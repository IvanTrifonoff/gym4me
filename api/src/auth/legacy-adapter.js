import { athleteActor } from './actor.js';
import { parseLegacyAthleteSession } from './sessions.js';

export function legacyCookieName(actorType) {
  return actorType === 'athlete' ? 'gymsid' : 'adminsid';
}

export function resolveLegacyActor({ cookies = {}, secret, userVersionOf = () => 0, now = Date.now() }) {
  const token = cookies.gymsid;
  if (!token) return null;
  const payload = parseLegacyAthleteSession(token, secret, { now, sessionVersion: null });
  if (!payload) return null;
  if (payload.version !== Number(userVersionOf(payload.actorId) || 0)) return null;
  return athleteActor(payload.actorId);
}

export function legacyStateKey(athleteId) {
  const safe = String(athleteId).replace(/[^a-zA-Z0-9_-]/g, '');
  return `state-${safe}.json`;
}

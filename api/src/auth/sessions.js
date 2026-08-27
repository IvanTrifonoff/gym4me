import crypto from 'node:crypto';

export function signSession(payload, secret) {
  const mac = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${mac}`;
}

export function verifySession(token, secret) {
  if (!token || !secret) return null;
  const index = token.lastIndexOf('.');
  if (index < 1) return null;
  const payload = token.slice(0, index);
  const actual = Buffer.from(token.slice(index + 1));
  const expected = Buffer.from(crypto.createHmac('sha256', secret).update(payload).digest('base64url'));
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null;
  return payload;
}

export function createSession({ actorType, actorId, expiresAt, version = 0 }, secret) {
  return signSession(`${actorType}:${actorId}:${expiresAt}:${version}`, secret);
}

export function parseSession(token, secret, now = Date.now()) {
  const payload = verifySession(token, secret);
  if (!payload) return null;
  const [actorType, actorId, expiresAt, version] = payload.split(':');
  if (!actorType || !actorId || !Number.isFinite(Number(expiresAt)) || Number(expiresAt) <= now) return null;
  if (!Number.isInteger(Number(version || 0))) return null;
  return { actorType, actorId, expiresAt: Number(expiresAt), version: Number(version || 0) };
}

// Legacy production athlete cookie format: <userId>:<expiry>:<sessionVersion>.<hmac>.
// Keep this parser separate from the new actor session format during migration.
export function parseLegacyAthleteSession(token, secret, { now = Date.now(), sessionVersion = null } = {}) {
  const payload = verifySession(token, secret);
  if (!payload) return null;
  const [actorId, expiresAt, version] = payload.split(':');
  if (!actorId || !Number.isFinite(Number(expiresAt)) || Number(expiresAt) <= now) return null;
  const claimed = version === undefined ? 0 : Number(version);
  if (!Number.isInteger(claimed)) return null;
  if (sessionVersion !== null && claimed !== Number(sessionVersion)) return null;
  return { actorId, expiresAt: Number(expiresAt), version: claimed };
}

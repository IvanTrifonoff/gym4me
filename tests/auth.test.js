import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession, parseLegacyAthleteSession, signSession } from '../api/src/auth/sessions.js';
import { nextCounter } from '../api/src/auth/webauthn.js';
import { resolveLegacyActor } from '../api/src/auth/legacy-adapter.js';

const secret = 'test-only-secret';

test('new actor session round trips', () => {
  const token = createSession({ actorType: 'athlete', actorId: 'a1', expiresAt: Date.now() + 60_000, version: 2 }, secret);
  const session = parseLegacyAthleteSession(token, secret);
  assert.equal(session, null);
});

test('real legacy gymsid resolves to athlete actor', () => {
  const token = signSession(`a1:${Date.now() + 60_000}:2`, secret);
  assert.deepEqual(resolveLegacyActor({ cookies: { gymsid: token }, secret, userVersionOf: () => 2 }), { type: 'athlete', id: 'a1' });
  assert.equal(resolveLegacyActor({ cookies: { gymsid: token }, secret, userVersionOf: () => 1 }), null);
});

test('tampered and expired legacy sessions are rejected', () => {
  const expired = signSession(`a1:${Date.now() - 1}:0`, secret);
  assert.equal(parseLegacyAthleteSession(expired, secret), null);
  assert.equal(parseLegacyAthleteSession(expired + 'x', secret), null);
});

test('authenticator counter cannot move backwards', () => {
  assert.equal(nextCounter(0, 1), 1);
  assert.throws(() => nextCounter(2, 2), /clone/);
});

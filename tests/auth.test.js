import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession, parseSession, signSession } from '../api/src/auth/sessions.js';
import { nextCounter } from '../api/src/auth/passkeys.js';
import { resolveLegacyActor } from '../api/src/auth/legacy-adapter.js';

const secret = 'test-only-secret';

test('signed athlete session round trips', () => {
  const token = createSession({ actorType: 'athlete', actorId: 'a1', expiresAt: Date.now() + 60_000, version: 2 }, secret);
  const session = parseSession(token, secret);
  assert.equal(session.actorType, 'athlete');
  assert.equal(session.actorId, 'a1');
  assert.equal(session.version, 2);
});

test('tampered or expired sessions are rejected', () => {
  const token = createSession({ actorType: 'athlete', actorId: 'a1', expiresAt: Date.now() - 1 }, secret);
  assert.equal(parseSession(token, secret), null);
  assert.equal(parseSession(token + 'x', secret), null);
});

test('legacy gymsid resolves only to athlete actor', () => {
  const token = signSession(`athlete:a1:${Date.now() + 60_000}:0`, secret);
  assert.deepEqual(resolveLegacyActor({ cookies: { gymsid: token }, secret }), { type: 'athlete', id: 'a1' });
  assert.equal(resolveLegacyActor({ cookies: { adminsid: token }, secret }), null);
});

test('authenticator counter cannot move backwards', () => {
  assert.equal(nextCounter(0, 1), 1);
  assert.throws(() => nextCounter(2, 2), /clone/);
});

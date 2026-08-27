import test from 'node:test';
import assert from 'node:assert/strict';
import { AthleteService } from '../api/src/domains/athlete/athlete.service.js';
import { athleteActor } from '../api/src/auth/actor.js';

const repo = { async getState(id) { return { owner: id, theme: 'light' }; }, async saveState(id, state) { return { ...state, owner: id }; } };
const service = new AthleteService(repo);

test('athlete service scopes reads and writes to the actor', async () => {
  const actor = athleteActor('a1');
  assert.equal((await service.getState(actor)).owner, 'a1');
  await assert.rejects(() => service.getState(actor, 'a2'), /denied/);
  await assert.rejects(() => service.saveState(actor, 'a2', {}), /denied/);
});

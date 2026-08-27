import test from 'node:test';
import assert from 'node:assert/strict';
import { AthleteHistoryService } from '../api/src/domains/athlete/athlete-history.service.js';
import { athleteActor } from '../api/src/auth/actor.js';
test('history service uses athlete actor and safe fallback', async () => { const actor = athleteActor('a1'); const service = new AthleteHistoryService({ pgRepository: null, stateRepository: { async get(id) { assert.equal(id, 'a1'); return { workouts: [{ id: 'w1' }] }; } } }); assert.deepEqual(await service.list(actor), [{ id: 'w1' }]); });
test('history service never writes fallback data implicitly', async () => { let called = false; const service = new AthleteHistoryService({ pgRepository: null, stateRepository: { async get() { return { workouts: [] }; }, async save() { called = true; } } }); assert.equal(await service.save(athleteActor('a1'), { id: 'w1' }), null); assert.equal(called, false); });

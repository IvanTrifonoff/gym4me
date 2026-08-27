import test from 'node:test';
import assert from 'node:assert/strict';
import { AthleteBodyweightRepository } from '../api/src/db/athlete-bodyweight.repository.js';

test('bodyweight repository fails closed without a pool', async () => {
  const repository = new AthleteBodyweightRepository(null);
  await assert.rejects(repository.list('athlete-1'), /unavailable/);
  await assert.rejects(repository.save('athlete-1', { d: '2026-08-27', w: 78 }), /unavailable/);
});

test('bodyweight repository scopes SQL parameters to the athlete', async () => {
  const queries = [];
  const pool = { query: async (...args) => { queries.push(args); return { rows: [{ d: '2026-08-27', w: '78.0' }] }; } };
  const repository = new AthleteBodyweightRepository(pool);
  await repository.save('athlete-1', { d: '2026-08-27', w: 78 });
  assert.deepEqual(queries[0][1], ['athlete-1', '2026-08-27', 78]);
});

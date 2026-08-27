import test from 'node:test';
import assert from 'node:assert/strict';
import { AthleteRepository } from '../api/src/domains/athlete/athlete.repository.js';
import { AthleteService } from '../api/src/domains/athlete/athlete.service.js';
import { athleteStateDto } from '../api/src/domains/athlete/athlete.schemas.js';

const repo = new AthleteRepository({
  profiles: new Map([['a1', { id: 'a1', name: 'Alice', createdAt: '2026-01-01' }]]),
  states: new Map([['a1', { workouts: [], customEx: [{ id: 'own' }], secret: 'must-drop' }]])
});
const service = new AthleteService(repo);

test('athlete receives full allowed state including settings and custom exercises', async () => {
  const state = await service.getState({ type: 'athlete', id: 'a1' });
  assert.deepEqual(state.customEx, [{ id: 'own' }]);
  assert.equal('secret' in state, false);
});

test('athlete cannot read another athlete state', async () => {
  await assert.rejects(() => service.getState({ type: 'athlete', id: 'a2' }, 'a1'), { status: 403 });
});

test('athlete cannot write another athlete state', async () => {
  await assert.rejects(() => service.saveState({ type: 'athlete', id: 'a2' }, 'a1', { workouts: [] }), { status: 403 });
});

test('unknown fields are excluded from the public DTO', () => {
  assert.deepEqual(athleteStateDto({ unit: 'kg', customEx: [], password: 'x' }), { unit: 'kg', customEx: [] });
});

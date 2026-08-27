import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { AthleteStateFileRepository } from '../api/src/domains/athlete/athlete-state.repository.js';

test('file repository isolates athlete state and preserves all settings', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'opengym-athlete-'));
  const repo = new AthleteStateFileRepository(dir);
  await repo.save('a1', { theme: 'light', unit: 'lb', customEx: [{ id: 'private' }], workouts: [{ d: '2026-01-01' }], secret: 'drop' });
  await repo.save('a2', { theme: 'dark', customEx: [{ id: 'other' }] });
  const a1 = await repo.get('a1');
  const a2 = await repo.get('a2');
  assert.equal(a1.theme, 'light');
  assert.equal(a1.unit, 'lb');
  assert.deepEqual(a1.customEx, [{ id: 'private' }]);
  assert.equal('secret' in a1, false);
  assert.deepEqual(a2.customEx, [{ id: 'other' }]);
  assert.notDeepEqual(a1.customEx, a2.customEx);
});

test('invalid athlete ids cannot escape the data directory', async () => {
  const repo = new AthleteStateFileRepository('/tmp/opengym-test');
  assert.throws(() => repo.fileFor('../other'), /invalid athlete id/);
  assert.throws(() => repo.fileFor('a/b'), /invalid athlete id/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { LegacyAthleteProfileRepository } from '../api/src/domains/athlete/legacy-profile.repository.js';

test('legacy profile adapter exposes only public athlete fields', async () => {
  const file = path.join(await fs.mkdtemp(path.join(os.tmpdir(), 'gym4me-')), 'users.json');
  await fs.writeFile(file, JSON.stringify({ users: [{ id: 'a1', name: 'Alex', passkey: 'secret', password: 'secret' }] }));
  const profile = await new LegacyAthleteProfileRepository(file).getProfile('a1');
  assert.deepEqual(profile, { id: 'a1', name: 'Alex', createdAt: null });
  assert.equal('passkey' in profile, false);
});

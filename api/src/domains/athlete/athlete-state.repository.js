import fs from 'node:fs/promises';
import path from 'node:path';
import { ATHLETE_STATE_KEYS } from './athlete.schemas.js';
import { ATHLETE_DEFAULT_STATE } from './athlete.defaults.js';

function safeId(id) {
  const value = String(id || '');
  if (!/^[a-zA-Z0-9_-]+$/.test(value)) throw new Error('invalid athlete id');
  return value;
}

function publicState(state = {}) {
  const result = structuredClone(ATHLETE_DEFAULT_STATE);
  for (const key of ATHLETE_STATE_KEYS) if (key in state) result[key] = state[key];
  return result;
}

export class AthleteStateFileRepository {
  constructor(dataDir) { this.dataDir = dataDir; }

  fileFor(athleteId) { return path.join(this.dataDir, `state-${safeId(athleteId)}.json`); }

  async get(athleteId) {
    try { return publicState(JSON.parse(await fs.readFile(this.fileFor(athleteId), 'utf8'))); }
    catch (error) { if (error.code === 'ENOENT') return publicState(); throw error; }
  }

  async save(athleteId, state) {
    const file = this.fileFor(athleteId);
    await fs.mkdir(this.dataDir, { recursive: true });
    const next = publicState(state);
    const temp = `${file}.${process.pid}.tmp`;
    await fs.writeFile(temp, JSON.stringify(next), { mode: 0o600 });
    await fs.rename(temp, file);
    return next;
  }
}

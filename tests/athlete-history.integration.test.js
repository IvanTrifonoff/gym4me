import test from 'node:test';
import assert from 'node:assert/strict';
import pg from '../api/node_modules/pg/lib/index.js';
import { AthleteHistoryRepository } from '../api/src/db/athlete-history.repository.js';
import { migrateAthleteHistory } from '../api/src/db/athlete-history.migration.js';
const connectionString = process.env.TEST_DATABASE_URL;
test('PostgreSQL athlete history migration and isolation', { skip: !connectionString }, async () => { const pool = new pg.Pool({ connectionString }); try { await pool.query('DROP TABLE IF EXISTS athlete_workout_history'); await migrateAthleteHistory(pool); const repo = new AthleteHistoryRepository(pool); await repo.save('a1', { id: 'w1', d: '2026-08-27', name: 'Сила', entries: [{ id: 'e1', sets: [{ w: 20, r: 8 }] }] }); await repo.save('a1', { id: 'w1', d: '2026-08-27', name: 'Сила обновлена', entries: [] }); await repo.save('a2', { id: 'w2', d: '2026-08-27', name: 'Кардио', entries: [] }); const a1 = await repo.list('a1'); const a2 = await repo.list('a2'); assert.equal(a1.length, 1); assert.equal(a1[0].name, 'Сила обновлена'); assert.equal(a2.length, 1); assert.equal(a2[0].id, 'w2'); } finally { await pool.query('DROP TABLE IF EXISTS athlete_workout_history'); await pool.end(); } });

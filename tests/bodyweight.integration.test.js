import test from 'node:test';
import assert from 'node:assert/strict';
import pg from '../api/node_modules/pg/lib/index.js';
import { AthleteBodyweightRepository } from '../api/src/db/athlete-bodyweight.repository.js';
import { migrateAthleteBodyweight } from '../api/src/db/athlete-bodyweight.migration.js';

const connectionString = process.env.TEST_DATABASE_URL;

test('PostgreSQL bodyweight migration, upsert and athlete isolation', { skip: !connectionString }, async () => {
  const pool = new pg.Pool({ connectionString });
  try {
    await pool.query('DROP TABLE IF EXISTS athlete_bodyweight');
    await migrateAthleteBodyweight(pool);
    const repository = new AthleteBodyweightRepository(pool);
    await repository.save('a1', { d: '2026-08-27', w: 80 });
    await repository.save('a1', { d: '2026-08-27', w: 78.5 });
    await repository.save('a2', { d: '2026-08-27', w: 95 });
    assert.deepEqual(await repository.list('a1'), [{ d: '2026-08-27', w: 78.5 }]);
    assert.deepEqual(await repository.list('a2'), [{ d: '2026-08-27', w: 95 }]);
    await assert.rejects(pool.query("INSERT INTO athlete_bodyweight (athlete_id, measured_on, weight_kg) VALUES ('a1', '2026-08-28', 0)"));
  } finally {
    await pool.query('DROP TABLE IF EXISTS athlete_bodyweight');
    await pool.end();
  }
});

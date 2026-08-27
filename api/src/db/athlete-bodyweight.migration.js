import fs from 'node:fs/promises';

export async function migrateAthleteBodyweight(pool) {
  if (!pool) return false;
  await pool.query(await fs.readFile(new URL('./athlete-bodyweight.sql', import.meta.url), 'utf8'));
  return true;
}

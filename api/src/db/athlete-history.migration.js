import fs from 'node:fs/promises';
export async function migrateAthleteHistory(pool) { if (!pool) return false; await pool.query(await fs.readFile(new URL('./athlete-history.sql', import.meta.url), 'utf8')); return true; }

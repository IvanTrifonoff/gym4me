import fs from 'node:fs/promises';

export class AthleteBodyweightRepository {
  constructor(pool) { this.pool = pool; }
  async migrate() {
    if (!this.pool) return false;
    await this.pool.query(await fs.readFile(new URL('./athlete-bodyweight.sql', import.meta.url), 'utf8'));
    return true;
  }
  async list(athleteId, { limit = 100 } = {}) {
    if (!this.pool) throw new Error('bodyweight database unavailable');
    const result = await this.pool.query('SELECT measured_on AS d, weight_kg AS w FROM athlete_bodyweight WHERE athlete_id = $1 ORDER BY measured_on DESC LIMIT $2', [String(athleteId), Math.min(500, Math.max(1, Number(limit) || 100))]);
    return result.rows.reverse().map(row => ({ d: String(row.d).slice(0, 10), w: Number(row.w) }));
  }
  async save(athleteId, point) {
    if (!this.pool) throw new Error('bodyweight database unavailable');
    const result = await this.pool.query('INSERT INTO athlete_bodyweight (athlete_id, measured_on, weight_kg) VALUES ($1, $2, $3) ON CONFLICT (athlete_id, measured_on) DO UPDATE SET weight_kg = EXCLUDED.weight_kg, updated_at = now() RETURNING measured_on AS d, weight_kg AS w', [String(athleteId), point.d, point.w]);
    return { d: String(result.rows[0].d).slice(0, 10), w: Number(result.rows[0].w) };
  }
}

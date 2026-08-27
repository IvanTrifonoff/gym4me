import test from 'node:test';
import assert from 'node:assert/strict';
import { AthleteHistoryRepository } from '../api/src/db/athlete-history.repository.js';
test('history repository scopes list and writes by athlete id', async () => { const calls = []; const pool = { async query(sql, params) { calls.push({ sql, params }); return { rows: [{ id: 'w1', athlete_id: 'a1' }] }; } }; const repo = new AthleteHistoryRepository(pool); await repo.list('a1'); await repo.save('a1', { id: 'w1', name: 'Сила', entries: [] }); assert.equal(calls[0].params[0], 'a1'); assert.equal(calls[1].params[1], 'a1'); assert.match(calls[1].sql, /ON CONFLICT/); });
test('history repository fails closed without database', async () => { const repo = new AthleteHistoryRepository(null); await assert.rejects(() => repo.list('a1'), /unavailable/); await assert.rejects(() => repo.save('a1', { id: 'w1' }), /unavailable/); });

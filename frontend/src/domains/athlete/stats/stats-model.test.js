import { describe, expect, it } from 'vitest';
import { exerciseStats, streakDays, workoutStats } from './stats-model.js';
describe('Athlete Stats model', () => { it('aggregates workout volume and sets', () => { const state = { workouts: [{ d: new Date().toISOString().slice(0,10), entries: [{ id: 'e1', sets: [{ w: 20, r: 8, done: true }, { w: 30, r: 5, done: true }] }] }] }; expect(workoutStats(state)).toMatchObject({ workouts: 1, sets: 2, volume: 310 }); expect(exerciseStats(state)[0]).toMatchObject({ id: 'e1', sets: 2, volume: 310, best: 30 }); expect(streakDays(state)).toBe(1); }); });

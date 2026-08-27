import { describe, expect, it } from 'vitest';
import { addBodyweight, bodyweightPoints, normalizeBodyweightPoint } from './bodyweight-model.js';

describe('bodyweight model', () => {
  it('normalizes valid values and rejects unsafe values', () => {
    expect(normalizeBodyweightPoint({ weight: '78.36', date: '2026-08-27' })).toEqual({ w: 78.4, d: '2026-08-27' });
    expect(normalizeBodyweightPoint({ w: 0, d: '2026-08-27' })).toBeNull();
    expect(normalizeBodyweightPoint({ w: 78, d: 'bad' })).toBeNull();
  });

  it('sorts points and replaces an existing date', () => {
    const state = { bodyweight: [{ w: 80, d: '2026-08-01' }, { w: 79, d: '2026-08-27' }] };
    expect(bodyweightPoints(state)).toEqual(state.bodyweight);
    expect(addBodyweight(state, { w: 78.5, d: '2026-08-27' })).toEqual([{ w: 80, d: '2026-08-01' }, { w: 78.5, d: '2026-08-27' }]);
  });

  it('throws on invalid entries', () => {
    expect(() => addBodyweight({}, { w: 600, d: '2026-08-27' })).toThrow(/invalid/);
  });
});

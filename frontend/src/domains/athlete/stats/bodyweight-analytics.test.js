import { describe, expect, it } from 'vitest';
import { bodyweightSeries, chartPoints } from './bodyweight-analytics.js';

describe('bodyweight analytics', () => {
  const now = Date.parse('2026-08-27T12:00:00Z');
  it('filters points by period and keeps chronological order', () => {
    const state = { bodyweight: [{ d: '2026-07-01', w: 81 }, { d: '2026-08-01', w: 80 }, { d: '2026-08-27', w: 78 }] };
    expect(bodyweightSeries(state, 30, now)).toEqual([{ d: '2026-08-01', w: 80 }, { d: '2026-08-27', w: 78 }]);
  });
  it('creates an SVG-compatible polyline and handles one point', () => {
    expect(chartPoints([{ d: '2026-08-27', w: 78 }])).toBe('160.0,112.0');
    expect(chartPoints([{ w: 80 }, { w: 78 }], 100, 100)).toBe('0.0,8.0 100.0,92.0');
  });
});

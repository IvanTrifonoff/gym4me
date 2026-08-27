import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadBodyweight, mergeBodyweight, saveBodyweight } from './bodyweight-sync.js';

const state = { bodyweight: [{ d: '2026-08-01', w: 80 }, { d: '2026-08-27', w: 79 }] };

describe('bodyweight sync', () => {
  beforeEach(() => vi.restoreAllMocks());
  it('preserves local-only dates and prefers server values', () => {
    expect(mergeBodyweight(state.bodyweight, [{ d: '2026-08-27', w: 78 }, { d: '2026-08-28', w: 77 }])).toEqual([{ d: '2026-08-01', w: 80 }, { d: '2026-08-27', w: 78 }, { d: '2026-08-28', w: 77 }]);
  });
  it('merges remote data on load', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: [{ d: '2026-08-27', w: 78 }] }) }));
    await expect(loadBodyweight(state)).resolves.toEqual([{ d: '2026-08-01', w: 80 }, { d: '2026-08-27', w: 78 }]);
  });
  it('keeps local state when saving offline', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const update = vi.fn().mockResolvedValue(undefined);
    await saveBodyweight(state, { d: '2026-08-28', w: 78 }, update);
    expect(update).toHaveBeenCalledWith({ bodyweight: [...state.bodyweight, { d: '2026-08-28', w: 78 }] });
  });
});

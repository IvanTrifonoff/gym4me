import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadBodyweight, saveBodyweight } from './bodyweight-sync.js';

const state = { bodyweight: [{ d: '2026-08-01', w: 80 }] };

describe('bodyweight sync', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('loads server data when available', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: [{ d: '2026-08-27', w: 78 }] }) }));
    await expect(loadBodyweight(state)).resolves.toEqual([{ d: '2026-08-27', w: 78 }]);
  });

  it('falls back to local data on API failure and saves local state', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const update = vi.fn().mockResolvedValue(undefined);
    await expect(saveBodyweight(state, { d: '2026-08-27', w: 78 }, update)).resolves.toEqual([{ d: '2026-08-01', w: 80 }, { d: '2026-08-27', w: 78 }]);
    expect(update).toHaveBeenCalledWith({ bodyweight: [{ d: '2026-08-01', w: 80 }, { d: '2026-08-27', w: 78 }] });
  });
});

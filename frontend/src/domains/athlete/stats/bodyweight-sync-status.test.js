import { beforeEach, describe, expect, it, vi } from 'vitest';
import { syncBodyweight } from './bodyweight-sync.js';

describe('bodyweight sync status', () => {
  beforeEach(() => vi.restoreAllMocks());
  it('reports online and merged points', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: [{ d: '2026-08-27', w: 78 }] }) }));
    await expect(syncBodyweight({ bodyweight: [{ d: '2026-08-01', w: 80 }] })).resolves.toEqual({ points: [{ d: '2026-08-01', w: 80 }, { d: '2026-08-27', w: 78 }], online: true });
  });
  it('reports offline and keeps local points', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    await expect(syncBodyweight({ bodyweight: [{ d: '2026-08-01', w: 80 }] })).resolves.toEqual({ points: [{ d: '2026-08-01', w: 80 }], online: false });
  });
});

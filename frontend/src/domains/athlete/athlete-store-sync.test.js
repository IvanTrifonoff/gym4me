import { beforeEach, describe, expect, it, vi } from 'vitest';
import { athleteDefaults, useAthleteStore } from './athlete-store.js';

beforeEach(() => { useAthleteStore.setState({ state: { ...athleteDefaults }, loading: false, saving: false, error: null }); vi.restoreAllMocks(); });

describe('Athlete bodyweight startup sync', () => {
  it('merges server bodyweight into loaded state', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ data: { bodyweight: [{ d: '2026-08-01', w: 80 }] } }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ data: [{ d: '2026-08-27', w: 78 }] }) }));
    await useAthleteStore.getState().load();
    expect(useAthleteStore.getState().state.bodyweight).toEqual([{ d: '2026-08-01', w: 80 }, { d: '2026-08-27', w: 78 }]);
  });

  it('keeps state bodyweight when dedicated endpoint is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ data: { bodyweight: [{ d: '2026-08-01', w: 80 }] } }) })
      .mockRejectedValueOnce(new Error('offline')));
    await useAthleteStore.getState().load();
    expect(useAthleteStore.getState().state.bodyweight).toEqual([{ d: '2026-08-01', w: 80 }]);
  });
});

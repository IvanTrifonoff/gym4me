import { beforeEach, describe, expect, it, vi } from 'vitest';
import { athleteDefaults, useAthleteStore } from './athlete-store.js';

beforeEach(() => { useAthleteStore.setState({ state: { ...athleteDefaults }, loading: false, saving: false, error: null }); vi.restoreAllMocks(); });

describe('Athlete state store', () => {
  it('loads server state over safe defaults', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { theme: 'light', unit: 'lb' } }) }));
    await useAthleteStore.getState().load();
    expect(useAthleteStore.getState().state).toMatchObject({ theme: 'light', unit: 'lb', sound: true });
  });
  it('persists a setting through the API and keeps unrelated state', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { theme: 'light', unit: 'kg' } }) }));
    await useAthleteStore.getState().update({ theme: 'light' });
    expect(useAthleteStore.getState().state).toMatchObject({ theme: 'light', unit: 'kg' });
    expect(fetch).toHaveBeenCalledWith('/api/v1/athlete/state', expect.objectContaining({ method: 'PUT' }));
  });
  it('exposes an error when loading fails without losing defaults', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    await useAthleteStore.getState().load();
    expect(useAthleteStore.getState().error).toBeInstanceOf(Error);
    expect(useAthleteStore.getState().state).toMatchObject(athleteDefaults);
  });
});

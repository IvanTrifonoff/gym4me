import { create } from 'zustand';
import { apiRequest } from '../../shared/api/client.js';
import { mergeBodyweight } from './stats/bodyweight-sync.js';

export const athleteDefaults = Object.freeze({ unit: 'kg', sound: true, keepAwake: true, theme: 'dark', lang: 'ru', restSec: 90, accent: 'lime', gifSize: 'full', effort: null, reminder: { on: false, time: '08:00', tz: null }, bodyweight: [] });

export const useAthleteStore = create((set, get) => ({
  state: { ...athleteDefaults }, loading: false, saving: false, error: null,
  async load() {
    set({ loading: true, error: null });
    try {
      const state = await apiRequest('/api/v1/athlete/state');
      const merged = { ...athleteDefaults, ...state };
      try { merged.bodyweight = mergeBodyweight(merged.bodyweight, await apiRequest('/api/v1/athlete/bodyweight')); } catch { /* state fallback */ }
      set({ state: merged, loading: false });
    } catch (error) { set({ loading: false, error }); }
  },
  async update(patch) {
    const next = { ...get().state, ...patch };
    set({ state: next, saving: true, error: null });
    try { const state = await apiRequest('/api/v1/athlete/state', { method: 'PUT', body: JSON.stringify(next) }); set({ state: { ...athleteDefaults, ...state }, saving: false }); }
    catch (error) { set({ saving: false, error }); throw error; }
  },
}));

import { create } from 'zustand';
import { apiRequest } from '../../shared/api/client.js';

export const athleteDefaults = Object.freeze({ unit: 'kg', sound: true, keepAwake: true, theme: 'dark', lang: 'ru', restSec: 90, accent: 'lime', gifSize: 'full', effort: null, reminder: { on: false, time: '08:00', tz: null } });

export const useAthleteStore = create((set, get) => ({
  state: { ...athleteDefaults }, loading: false, saving: false, error: null,
  async load() { set({ loading: true, error: null }); try { const state = await apiRequest('/api/v1/athlete/state'); set({ state: { ...athleteDefaults, ...state }, loading: false }); } catch (error) { set({ loading: false, error }); } },
  async update(patch) { const next = { ...get().state, ...patch }; set({ state: next, saving: true, error: null }); try { const state = await apiRequest('/api/v1/athlete/state', { method: 'PUT', body: JSON.stringify(next) }); set({ state: { ...athleteDefaults, ...state }, saving: false }); } catch (error) { set({ saving: false, error }); throw error; } }
}));

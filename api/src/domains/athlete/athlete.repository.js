export class AthleteRepository {
  constructor({ profiles = new Map(), states = new Map() } = {}) {
    this.profiles = profiles;
    this.states = states;
  }

  async getProfile(id) { return this.profiles.get(id) ?? null; }
  async saveProfile(profile) { this.profiles.set(profile.id, profile); return profile; }
  async getState(id) { return this.states.get(id) ?? null; }
  async saveState(id, state) { this.states.set(id, structuredClone(state)); return state; }
}

export class AthleteRepository {
  constructor({ profiles = new Map(), stateRepository = null, states = new Map() } = {}) {
    this.profiles = profiles;
    this.stateRepository = stateRepository;
    this.states = states;
  }

  async getProfile(id) { return this.profiles.get(id) ?? null; }
  async saveProfile(profile) { this.profiles.set(profile.id, profile); return profile; }
  async getState(id) { return this.stateRepository ? this.stateRepository.get(id) : (this.states.get(id) ?? null); }
  async saveState(id, state) { return this.stateRepository ? this.stateRepository.save(id, state) : (this.states.set(id, structuredClone(state)), state); }
}

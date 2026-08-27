import { athleteProfileDto, athleteStateDto } from './athlete.schemas.js';
import { canReadProfile, canReadState, canWriteState } from './athlete.policy.js';

export class AthleteService {
  constructor(repository) { this.repository = repository; }

  async getMe(actor) {
    const profile = await this.repository.getProfile(actor?.id);
    if (!profile || !canReadProfile(actor, profile.id)) throw Object.assign(new Error('athlete not found'), { status: 404 });
    return athleteProfileDto(profile);
  }

  async getState(actor, athleteId = actor?.id) {
    if (!canReadState(actor, athleteId)) throw Object.assign(new Error('athlete state access denied'), { status: 403 });
    return athleteStateDto(await this.repository.getState(athleteId) ?? {});
  }

  async saveState(actor, athleteId, state) {
    if (!canWriteState(actor, athleteId)) throw Object.assign(new Error('athlete state access denied'), { status: 403 });
    if (!state || typeof state !== 'object' || Array.isArray(state)) throw Object.assign(new Error('state must be an object'), { status: 400 });
    return athleteStateDto(await this.repository.saveState(athleteId, athleteStateDto(state)));
  }
}

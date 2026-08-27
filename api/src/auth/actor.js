export const ACTOR_TYPES = Object.freeze({ ATHLETE: 'athlete', STAFF: 'staff' });
export function athleteActor(id) { return { type: ACTOR_TYPES.ATHLETE, id: String(id) }; }
export function staffActor(id, role, organizationId = null, branchIds = []) { return { type: ACTOR_TYPES.STAFF, id: String(id), role, organizationId, branchIds: [...branchIds] }; }
export function isAthlete(actor) { return actor?.type === ACTOR_TYPES.ATHLETE; }
export function isStaff(actor) { return actor?.type === ACTOR_TYPES.STAFF; }
export function canReadProfile(actor, athleteId) { return isAthlete(actor) && actor.id === String(athleteId); }
export function canReadState(actor, athleteId) { return canReadProfile(actor, athleteId); }
export function canWriteState(actor, athleteId) { return canReadProfile(actor, athleteId); }
export function canReadAsTrainer(actor, athleteId, assignment) { return isStaff(actor) && actor.role === 'trainer' && assignment?.trainerId === actor.id && assignment?.athleteId === String(athleteId); }

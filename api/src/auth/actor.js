export const ACTOR_TYPES = Object.freeze({ ATHLETE: 'athlete', STAFF: 'staff' });

export function athleteActor(id) {
  return { type: ACTOR_TYPES.ATHLETE, id: String(id) };
}

export function staffActor(id, role, organizationId = null, branchIds = []) {
  return { type: ACTOR_TYPES.STAFF, id: String(id), role, organizationId, branchIds: [...branchIds] };
}

export function isAthlete(actor) { return actor?.type === ACTOR_TYPES.ATHLETE; }
export function isStaff(actor) { return actor?.type === ACTOR_TYPES.STAFF; }

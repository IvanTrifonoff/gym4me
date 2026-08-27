export function canReadProfile(actor, athleteId) {
  return actor?.type === 'athlete' && actor.id === athleteId;
}

export function canReadState(actor, athleteId) {
  return canReadProfile(actor, athleteId);
}

export function canWriteState(actor, athleteId) {
  return canReadProfile(actor, athleteId);
}

export function canReadAsTrainer(actor, athleteId, assignment) {
  return actor?.type === 'trainer' && assignment?.trainerId === actor.id && assignment?.athleteId === athleteId;
}

export function athleteRoutes(service) {
  return {
    async me(actor) { return service.getMe(actor); },
    async getState(actor) { return service.getState(actor); },
    async saveState(actor, state) { return service.saveState(actor, actor.id, state); }
  };
}

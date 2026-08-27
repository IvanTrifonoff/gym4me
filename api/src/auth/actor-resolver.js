import { parseCookies } from '../http/cookies.js';
import { resolveLegacyActor } from './legacy-adapter.js';

export function resolveRequestActor(req, { secret, userVersionOf = () => 0 } = {}) {
  return resolveLegacyActor({ cookies: parseCookies(req.headers.cookie), secret, userVersionOf });
}

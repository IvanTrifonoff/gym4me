import http from 'node:http';
import { runtimeConfig } from './config/runtime.js';
import { sendJson } from './http/json-response.js';
import { resolveRequestActor } from './auth/actor-resolver.js';
import { AthleteStateFileRepository } from './domains/athlete/athlete-state.repository.js';
import { AthleteRepository } from './domains/athlete/athlete.repository.js';
import { LegacyAthleteProfileRepository } from './domains/athlete/legacy-profile.repository.js';
import { AthleteService } from './domains/athlete/athlete.service.js';
import { AthleteActivityRepository, activityDto } from './domains/athlete/athlete-activity.js';
import { AthleteHistoryService } from './domains/athlete/athlete-history.service.js';
import { AthleteHistoryRepository } from './db/athlete-history.repository.js';
import { createPool } from './db/pool.js';
import { AthleteBodyweightRepository } from './db/athlete-bodyweight.repository.js';
import { normalizeBodyweightPoint } from './domains/athlete/athlete-bodyweight.js';
const config = runtimeConfig();
const stateRepository = new AthleteStateFileRepository(config.dataDir);
const pool = createPool();
const repository = new AthleteRepository({ stateRepository, profileRepository: process.env.LEGACY_USERS_FILE ? new LegacyAthleteProfileRepository(process.env.LEGACY_USERS_FILE) : null });
const service = new AthleteService(repository); const activity = new AthleteActivityRepository(); const history = new AthleteHistoryService({ pgRepository: pool ? new AthleteHistoryRepository(pool) : null, stateRepository });
const bodyweightRepository = process.env.ATHLETE_BODYWEIGHT_PG === '1' && pool ? new AthleteBodyweightRepository(pool) : null;
function pathname(req) { return new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname; }
async function readJson(req) { let body = ''; for await (const chunk of req) body += chunk; try { return body ? JSON.parse(body) : {}; } catch { throw Object.assign(new Error('invalid JSON'), { status: 400 }); } }
export function createServer() { return http.createServer(async (req, res) => { try { if (req.method === 'GET' && pathname(req) === '/api/health') return sendJson(res, 200, { ok: true, service: 'opengym-next' }); const actor = resolveRequestActor(req, { secret: config.sessionSecret }); if (!actor) return sendJson(res, 401, { error: 'authentication required' }); if (req.method === 'GET' && pathname(req) === '/api/v1/athlete/bodyweight') return sendJson(res, 200, { data: bodyweightRepository ? await bodyweightRepository.list(actor.id) : (await service.getState(actor)).bodyweight || [] }); if (req.method === 'POST' && pathname(req) === '/api/v1/athlete/bodyweight') { const point = normalizeBodyweightPoint(await readJson(req)); if (!point) return sendJson(res, 400, { error: 'invalid bodyweight' }); return sendJson(res, 201, { data: bodyweightRepository ? await bodyweightRepository.save(actor.id, point) : point }); } if (req.method === 'POST' && pathname(req) === '/api/v1/athlete/activity') return sendJson(res, 200, { data: activity.set(actor.id, await readJson(req)) }); if (req.method === 'GET' && pathname(req) === '/api/v1/athlete/history') return sendJson(res, 200, { data: await history.list(actor) }); if (req.method === 'POST' && pathname(req) === '/api/v1/athlete/history') return sendJson(res, 201, { data: await history.save(actor, await readJson(req)) }); if (req.method === 'GET' && pathname(req) === '/api/v1/athlete/me') return sendJson(res, 200, { data: await service.getMe(actor) }); if (req.method === 'GET' && pathname(req) === '/api/v1/athlete/state') return sendJson(res, 200, { data: await service.getState(actor) }); if (req.method === 'PUT' && pathname(req) === '/api/v1/athlete/state') return sendJson(res, 200, { data: await service.saveState(actor, actor.id, await readJson(req)) }); return sendJson(res, 404, { error: 'not found' }); } catch (error) { return sendJson(res, error.status || 500, { error: error.message || 'internal error' }); } }); }
const server = createServer();
if (process.env.GYM4ME_START_SERVER === '1') server.listen(config.port, () => console.log(`opengym-next api on :${config.port}`));
export { server, service, activity, activityDto, history };

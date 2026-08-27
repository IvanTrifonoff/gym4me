import path from 'node:path';

export function runtimeConfig(env = process.env) {
  return {
    port: Number(env.PORT || 3100),
    dataDir: env.ATHLETE_DATA_DIR || path.resolve(process.cwd(), 'data'),
    sessionSecret: env.SESSION_SECRET || ''
  };
}

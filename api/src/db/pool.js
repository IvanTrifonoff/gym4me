import pg from 'pg';
export function createPool(connectionString = process.env.DATABASE_URL) { return connectionString ? new pg.Pool({ connectionString, max: 5, idleTimeoutMillis: 10000 }) : null; }

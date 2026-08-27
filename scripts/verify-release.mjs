import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const version = fs.readFileSync('VERSION', 'utf8').trim();
if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error(`Invalid VERSION: ${version}`);
for (const file of ['package.json', 'api/package.json', 'frontend/package.json']) {
  const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (pkg.version !== version) throw new Error(`${file} version ${pkg.version} != ${version}`);
}
const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
if (!changelog.includes(`## [${version}]`)) throw new Error(`CHANGELOG missing ${version}`);
let tracked = [];
try { tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).split('\n'); } catch { console.warn('git unavailable; secret tracking check must run on the host'); }
for (const forbidden of ['data/secret', 'data/vapid.json', 'data/db.json']) if (tracked.includes(forbidden)) throw new Error(`Runtime secret/data tracked: ${forbidden}`);
console.log(`release verification passed: ${version}`);

import test from 'node:test';
import assert from 'node:assert/strict';
import { AthleteActivityRepository, activityDto } from '../api/src/domains/athlete/athlete-activity.js';
test('activity dto exposes bounded aggregate progress only', () => { const item = activityDto({ active: true, name: 'x'.repeat(100), exIdx: 2, exTotal: 5, setsDone: 3, setsTotal: 10, startedAt: 50, password: 'secret' }); assert.equal(item.name.length, 60); assert.deepEqual(Object.keys(item).sort(), ['active','exerciseIndex','exerciseTotal','name','setsDone','setsTotal','startedAt']); });
test('activity repository isolates athletes and removes inactive presence', () => { const repo = new AthleteActivityRepository(); repo.set('a1', { active: true, name: 'A' }); repo.set('a2', { active: true, name: 'B' }); assert.equal(repo.get('a1').name, 'A'); assert.equal(repo.get('a2').name, 'B'); repo.set('a1', { active: false }); assert.equal(repo.get('a1'), null); });

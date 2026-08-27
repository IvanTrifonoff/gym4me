import { describe, expect, it } from 'vitest';
import { restState, startRest } from './rest-timer.js';
describe('rest timer', () => { it('creates and expires a deadline', () => { expect(startRest(90, 1000)).toBe(91000); expect(restState(91000, 61000)).toMatchObject({ remaining: 30, active: true }); expect(restState(91000, 91001)).toMatchObject({ remaining: 0, active: false }); }); });

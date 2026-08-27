import { describe, expect, it } from 'vitest';
import { sections } from './AthleteApp.jsx';

describe('Athlete navigation contract', () => {
  it('contains all athlete-only sections', () => {
    expect(sections.map(([id]) => id)).toEqual(['home', 'plan', 'workout', 'stats', 'history', 'library', 'settings', 'notifications']);
  });
});

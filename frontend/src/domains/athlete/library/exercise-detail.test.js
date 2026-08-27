import { describe, expect, it } from 'vitest';
import {
  exerciseMedia,
  loadExerciseInstructions,
  normalizeExerciseDetail,
} from './exercise-detail.js';

describe('exercise detail', () => {
  it('normalizes custom exercises without media', () => {
    const detail = normalizeExerciseDetail({
      id: 'custom-1',
      name: 'Моё упражнение',
      custom: true,
      gif: 'bad.gif',
    });
    expect(detail.title).toBe('Моё упражнение');
    expect(exerciseMedia(detail)).toBeNull();
  });

  it('encodes media and preserves provided instructions', async () => {
    const detail = normalizeExerciseDetail({
      id: '1',
      title: 'Тяга',
      gif: 'row 1.gif',
      instructions: ['Шаг 1'],
    });
    expect(exerciseMedia(detail)).toBe('/gif/row%201.gif');
    await expect(loadExerciseInstructions(detail)).resolves.toEqual(['Шаг 1']);
  });

  it('returns empty instructions for custom exercises', async () => {
    await expect(
      loadExerciseInstructions({ id: 'custom-1', custom: true }),
    ).resolves.toEqual([]);
  });
});

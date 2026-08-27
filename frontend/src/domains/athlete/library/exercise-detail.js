let instructionPromise;

export function normalizeExerciseDetail(exercise) {
  if (!exercise) return null;
  return {
    ...exercise,
    title: String(exercise.title || exercise.name || 'Упражнение'),
    custom: Boolean(exercise.custom),
    gif: exercise.custom ? null : (exercise.gif || null),
    instructions: Array.isArray(exercise.instructions)
      ? exercise.instructions.filter(Boolean).map(String)
      : [],
  };
}

export function exerciseMedia(exercise, base = '/gif/') {
  const detail = normalizeExerciseDetail(exercise);
  if (!detail || detail.custom || !detail.gif) return null;
  return base + encodeURIComponent(detail.gif);
}

export async function loadExerciseInstructions(exercise) {
  const detail = normalizeExerciseDetail(exercise);
  if (!detail || detail.custom) return [];
  if (detail.instructions.length) return detail.instructions;
  instructionPromise ||= import('./exercise-catalog-data.js');
  const module = await instructionPromise;
  const source = module.default || module.exercises || module.catalog || [];
  const match = Array.isArray(source)
    ? source.find(item => String(item.id) === String(detail.id))
    : null;
  return Array.isArray(match?.instructions)
    ? match.instructions.filter(Boolean).map(String)
    : [];
}

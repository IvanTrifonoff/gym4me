import { useEffect, useState } from 'react';
import {
  exerciseMedia,
  loadExerciseInstructions,
  normalizeExerciseDetail,
} from './exercise-detail.js';

export function ExerciseDetail({ exercise, close }) {
  const detail = normalizeExerciseDetail(exercise);
  const [instructions, setInstructions] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    setInstructions(null);
    setError(false);
    loadExerciseInstructions(detail)
      .then(value => alive && setInstructions(value))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [detail?.id, detail?.custom]);

  if (!detail) return null;
  const media = exerciseMedia(detail);

  return (
    <div
      className="pwa-card library-detail"
      aria-label={`Детали упражнения: ${detail.title}`}
    >
      <button className="pwa-button" onClick={close}>Закрыть</button>
      <h2>{detail.title}</h2>
      {media ? (
        <img
          className="exercise-gif"
          src={media}
          loading="lazy"
          decoding="async"
          alt={`Техника выполнения: ${detail.title}`}
        />
      ) : (
        <div className="pwa-muted" role="status">
          Для пользовательского упражнения анимация недоступна.
        </div>
      )}
      {error ? (
        <p role="alert">Не удалось загрузить инструкцию.</p>
      ) : instructions === null ? (
        <p className="pwa-muted" aria-live="polite">Загрузка инструкции…</p>
      ) : instructions.length ? (
        <ol>
          {instructions.map((step, index) => (
            <li key={`${index}-${step}`}>{step}</li>
          ))}
        </ol>
      ) : (
        <p className="pwa-muted">Инструкция пока не добавлена.</p>
      )}
    </div>
  );
}

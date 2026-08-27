CREATE TABLE IF NOT EXISTS athlete_workout_history (
  id TEXT PRIMARY KEY,
  athlete_id TEXT NOT NULL,
  workout_date DATE NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  routine_id TEXT,
  started_at BIGINT,
  ended_at BIGINT,
  entries JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS athlete_workout_history_athlete_date_idx ON athlete_workout_history (athlete_id, workout_date DESC);

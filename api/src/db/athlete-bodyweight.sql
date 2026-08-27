CREATE TABLE IF NOT EXISTS athlete_bodyweight (
  athlete_id TEXT NOT NULL,
  measured_on DATE NOT NULL,
  weight_kg NUMERIC(5,1) NOT NULL CHECK (weight_kg > 0 AND weight_kg <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (athlete_id, measured_on)
);
CREATE INDEX IF NOT EXISTS athlete_bodyweight_date_idx ON athlete_bodyweight (athlete_id, measured_on DESC);

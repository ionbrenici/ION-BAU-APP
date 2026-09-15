CREATE TABLE IF NOT EXISTS ion_state (id integer PRIMARY KEY CHECK(id=1), revision integer NOT NULL DEFAULT 0, data jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS ion_sessions (token text PRIMARY KEY, user_id text NOT NULL, expires timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS ion_attempts (key text PRIMARY KEY, attempts integer NOT NULL, window_start timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS ion_files (id text PRIMARY KEY, owner_id text NOT NULL, name text NOT NULL, mime text NOT NULL, bytes bytea NOT NULL DEFAULT ''::bytea, complete boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS ion_backups (id bigserial PRIMARY KEY, created_at timestamptz DEFAULT now(), revision integer NOT NULL, data jsonb NOT NULL);

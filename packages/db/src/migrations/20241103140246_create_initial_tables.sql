-- migrate:up
CREATE TABLE IF NOT EXISTS group (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    currency text NOT NULL DEFAULT '$',
    created_at TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS group_member (
    id serial PRIMARY KEY,
    name text NOT NULL,
    group_id text NOT NULL REFERENCES group ON DELETE CASCADE
);

CREATE TYPE split_mode AS enum ('even', 'share', 'percentage', 'amount');

CREATE TABLE IF NOT EXISTS expense (
    id serial PRIMARY KEY,
    expense_date date NOT NULL DEFAULT CURRENT_DATE,
    name text NOT NULL,
    description text,
    amount integer NOT NULL,
    member_id integer NOT NULL REFERENCES group_member ON DELETE CASCADE,
    group_id uuid NOT NULL REFERENCES group ON DELETE CASCADE,
    is_payback boolean NOT NULL DEFAULT FALSE,
    split_mode split_mode NOT NULL DEFAULT 'EVENLY',
    created_at timestamp(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS expense_entry (
    expense_id integer NOT NULL,
    member_id integer NOT NULL,
    shares integer NOT NULL DEFAULT 1,
    CONSTRAINT pk_expense_entry PRIMARY KEY (expense_id, member_id)
);

CREATE TYPE activity_type AS enum (
    'update_group',
    'create_expense',
    'update_expense',
    'delete_expense'
);

CREATE TABLE IF NOT EXISTS activity (
    id serial PRIMARY KEY,
    group_id uuid NOT NULL REFERENCES group ON DELETE CASCADE,
    activity_type activity_type NOT NULL,
    member_id integer,
    expense_id integer,
    data text,
    created_at timestamp(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

-- migrate:down
DROP TABLE IF EXISTS group;

DROP TABLE IF EXISTS group_member;

DROP TABLE IF EXISTS expense;

DROP TYPE IF EXISTS split_mode;

DROP TABLE IF EXISTS expense_entry;

DROP TABLE IF EXISTS activity;

DROP TYPE IF EXISTS activity_type;
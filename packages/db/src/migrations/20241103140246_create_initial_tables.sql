-- migrate:up
CREATE TABLE
    IF NOT EXISTS "groups" (
        "id" uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid (),
        "name" text NOT NULL,
        "currency" text NOT NULL DEFAULT '$',
        "createdAt" TIMESTAMP(3)
        WITH
            TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- migrate:down
DROP TABLE IF EXISTS "groups";
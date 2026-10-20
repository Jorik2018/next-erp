CREATE TABLE IF NOT EXISTS classroom_invitations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

    candidate_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    classroom_id UUID NOT NULL
        REFERENCES classrooms(id)
        ON DELETE CASCADE,

    status VARCHAR(20) NOT NULL DEFAULT 'waiting'
        CHECK (
            status IN (
                'waiting',
                'accepted',
                'refused'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (candidate_id, classroom_id)
);

CREATE INDEX IF NOT EXISTS idx_classroom_invitations_candidate
    ON classroom_invitations(candidate_id);

CREATE INDEX IF NOT EXISTS idx_classroom_invitations_classroom
    ON classroom_invitations(classroom_id);

CREATE INDEX IF NOT EXISTS idx_classroom_invitations_status
    ON classroom_invitations(status);
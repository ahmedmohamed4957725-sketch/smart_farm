export const shorthands = undefined;

export const up = (pgm) => {
    pgm.sql(`
        CREATE TABLE users (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            google_id VARCHAR(255) UNIQUE,
            is_active BOOLEAN NOT NULL DEFAULT TRUE
        );
    `);
};

export const down = (pgm) => { 
    pgm.sql(`
        DROP TABLE users;
    `);
};
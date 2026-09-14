import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

db.connect()
    .then(() => console.log("Neon Database connected"))
    .catch((err) => console.error("Database connection failed:", err));

export default db;
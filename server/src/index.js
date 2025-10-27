// server/index.ts
import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import cors from "cors";

dotenv.config({ path: "../.env" });

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // trust the Aiven certificate
  },
});
// GET results
app.get("/results", async (req, res) => {
  const result = await pool.query("SELECT * FROM results");
  console.log(result);
  res.json(result.rows);
});

// POST new test result
app.post("/results", async (req, res) => {
  const now = new Date();
  const { test_name, status, duration, timestamp } = req.body;
  await pool.query(
    "INSERT INTO results (test_name, status, duration, timestamp) VALUES ($1, $2, $3, $4)",
    [test_name, status, duration, now]
  );
  res.sendStatus(201);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

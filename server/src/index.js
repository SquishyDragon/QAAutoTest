import express from "express";
const app = express();
import Database from "better-sqlite3";
import cors from "cors";

const port = 3000;

app.use(cors());
app.use(express.json());

const db = new Database("results.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_name TEXT,
    status TEXT,
    duration INTEGER,
    timestamp TEXT
  )
`
).run();

// Get Results
app.get("/resutls", (req, res) => {
  const rows = db.prepare("SELECT * FROM results ORDER BY id DESC").all();
  res.json(rows);
});

app.post("/resutls", (req, res) => {
  const data = req.body;
  const stmt = db.prepare(`
  INSERT INTO results (test_name, status, duration, timestamp)
  VALUES (?, ?, ?, ?)
`);
  const info = stmt.run(
    data.test_name,
    data.status,
    data.duration,
    new Date().toISOString()
  );
  res.send("done");
});
// Start the server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

import express from "express";

const router = express.Router();
import db from "../db.js";

router.get("/", (req, res) => {
  const getTasks = db.prepare("SELECT * FROM tasks WHERE user_id = ?");
  const tasks = getTasks.all(req.userId);
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { task } = req.body;
  const insertTask = db.prepare(
    `INSERT INTO tasks (user_id, task) VALUES (?, ?)`
  );
  const result = insertTask.run(req.userId, task);

  res.json({ id: result.lastInsertRowid, task, completed: 0 });
});

router.patch("/:id", (req, res) => {
  const { completed, task } = req.body;
  const { id } = req.params;
  const patchedTask = db.prepare(
    "UPDATE tasks SET task = ?, completed = ? WHERE ID = ?"
  );
  patchedTask.run(task, completed, id);

  res.json({ message: "Task updated." });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const deleteTask = db.prepare(
    `DELETE FROM tasks WHERE ID = ? AND user_id = ? `
  );

  deleteTask.run(id, userId);
  res.send({ messgae: "Task Deleted." });
});

export default router;

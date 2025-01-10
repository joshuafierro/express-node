import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, pass } = req.body;
  const hashPass = bcrypt.hashSync(pass, 10);
  try {
    const insertUser = db.prepare(
      `INSERT INTO users (username, password) VALUES (?,?)`
    );
    const result = insertUser.run(username, hashPass);

    const defaultTask = `Create your first task here.`;
    const insertTask = db.prepare(
      `INSERT INTO tasks (user_id, task) VALUES (?,?)`
    );
    insertTask.run(result.lastInsertRowid, defaultTask);

    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
  res.sendStatus(201);
});

router.post("/login", (req, res) => {
  const { username, pass } = req.body;

  try {
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username);
    if (!user || user.username == null) {
      return res.status(404).send({ message: "User not found" });
    }
    const passIsValid = bcrypt.compareSync(pass, user.password);
    if (!passIsValid) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});

export default router;

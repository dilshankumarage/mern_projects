const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/tasks  (list my tasks)
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST /api/tasks (create)
router.post("/", auth, async (req, res) => {
  const { title, priority, dueDate } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const task = await Task.create({
    user: req.user.id,
    title,
    priority: priority || "medium",
    dueDate: dueDate || null
  });

  res.status(201).json(task);
});

// PUT /api/tasks/:id (update)
router.put("/:id", auth, async (req, res) => {
  const { title, completed, priority, dueDate } = req.body;

  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;

  await task.save();
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
});

module.exports = router;

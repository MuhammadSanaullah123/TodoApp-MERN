const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Task = require("../../models/Task");

// @route   POST api/task
// @desc    Create a task
// @access  Private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newPost = {
        text: req.body.text,
        user: req.user.id,
      };

      const post = new Task(newPost);
      await post.save();

      res.status(200).json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/tasks
// @desc    Get all tasks of logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/tasks/:id
// @desc    Update the task
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { completed } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.completed = completed;

    task.completed_at = completed ? Date.now() : "";

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   Delete api/tasks/:id
// @desc    Delete the task
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    await task.deleteOne();

    res.status(200).json({ msg: "Task removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;

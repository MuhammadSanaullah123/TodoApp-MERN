const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completed_at: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);

const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

module.exports = mongoose.model("ToDo", todoSchema);

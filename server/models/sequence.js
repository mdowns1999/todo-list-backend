const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  id: { type: String, required: true },
  maxToDoId: { type: String, required: true },
});

module.exports = mongoose.model("Sequence", sequenceSchema);

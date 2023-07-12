var Sequence = require("../models/sequence");

var maxToDoId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .exec()
    .then((sequence) => {
      sequenceId = sequence._id;
      maxToDoId = sequence.maxToDoId;
    })
    .catch((err) => {
      console.log(err);
    });
}
SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {};
  var nextId;
  switch (collectionType) {
    case "todos":
      maxToDoId++;
      updateObject = { maxToDoId: maxToDoId };
      nextId = maxToDoId;
      break;
    default:
      return -1;
  }
  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
    .then((result) => console.log(result))
    .catch((err) => {
      console.log("nextId error = ", err);
      return null;
    });
  return nextId;
};
module.exports = new SequenceGenerator();

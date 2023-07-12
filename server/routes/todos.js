var express = require("express");
var router = express.Router();

const ToDo = require("../models/todo");
const sequenceGenerator = require("./sequenceGenerator");

//Get all Todo Items
router.get("/", (req, res, next) => {
  ToDo.find()
    .then((ToDoItems) => {
      res.status(200).json({
        message: "Got To-Do Items Successfully!",
        ToDoItems: ToDoItems,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

//Post a To-Do Item
router.post("/", (req, res, next) => {
  const maxToDoId = sequenceGenerator.nextId("todos");

  console.log("MADE IT PAST GENERTATOR");

  const todoItem = new ToDo({
    id: maxToDoId,
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    completed: false,
  });

  console.log("ABOUT TO SAVE");
  todoItem
    .save()
    .then((createdItem) => {
      res.status(201).json({
        message: "Item added successfully",
        todo: createdItem,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

//Update an Item
router.put("/:id", (req, res, next) => {
  ToDo.findOne({ id: req.params.id })
    .then((toDoItem) => {
      (toDoItem.name = req.body.name),
        (toDoItem.type = req.body.type),
        (toDoItem.description = req.body.description),
        (toDoItem.completed = req.body.completed);

      ToDo.updateOne({ id: req.params.id }, toDoItem)
        .then((result) => {
          res.status(204).json({
            message: "To-Do Item updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Contact not found.",
        error: { contact: "Contact not found" },
      });
    });
});

//Delete a Item
router.delete("/:id", (req, res, next) => {
  ToDo.findOne({ id: req.params.id })
    .then((todo) => {
      ToDo.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "To-Do Item deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "To-Do Item not found.",
        error: { contact: "To-Do Item not found" },
      });
    });
});

module.exports = router;

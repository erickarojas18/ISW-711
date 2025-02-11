const Task = require("../models/taskModel");

const taskPost = (req, res) => {
  const task = new Task({
    title: req.body.title,
    detail: req.body.detail
  });

  if (!task.title || !task.detail) {
    return res.status(422).json({ error: 'No valid data provided for task' });
  }

  task.save()
    .then(() => {
      res.status(201).json(task);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

const taskGet = (req, res) => {
  if (req.query.id) {
    Task.findById(req.query.id)
      .then(task => task ? res.json(task) : res.status(404).json({ error: "Task doesn't exist" }))
      .catch(err => res.status(500).json({ error: "Error fetching task" }));
  } else {
    Task.find()
      .then(tasks => res.json(tasks))
      .catch(err => res.status(500).json({ error: err.message }));
  }
};

const taskPatch = (req, res) => {
  if (!req.query.id) return res.status(400).json({ error: "Missing task ID" });

  Task.findById(req.query.id)
    .then(task => {
      if (!task) return res.status(404).json({ error: "Task doesn't exist" });

      task.title = req.body.title || task.title;
      task.detail = req.body.detail || task.detail;

      return task.save().then(() => res.status(200).json(task));
    })
    .catch(err => res.status(500).json({ error: "Error updating task" }));
};

const taskDelete = (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ error: "Task ID is required" });
  }

  Task.findByIdAndDelete(req.query.id)
    .then(task => {
      if (!task) return res.status(404).json({ error: "Task doesn't exist" });
      res.status(200).json({ message: "Task successfully deleted" });
    })
    .catch(err => res.status(500).json({ error: "Error deleting task" }));
};

module.exports = {
  taskGet,
  taskPost,
  taskPatch,
  taskPut: taskPatch,  // Asignación directa para PUT
  taskDelete
};

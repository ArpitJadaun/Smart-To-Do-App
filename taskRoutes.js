const express = require("express");
const router = express.Router();

const Task = require("../models/Task");


// GET ALL TASKS

router.get("/", async (req, res) => {
try {
const tasks = await Task.find().sort({ createdAt: -1 });
res.json(tasks);
}
catch (err) {
res.status(500).json({ message: err.message });
}
});


// CREATE TASK

router.post("/", async (req, res) => {
try {

const task = new Task(req.body);

const savedTask = await task.save();

res.status(201).json(savedTask);

}
catch (err) {

res.status(400).json({
message: err.message,
});

}
});


// UPDATE TASK

router.put("/:id", async (req, res) => {

try {

const updatedTask = await Task.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true,
}
);

res.json(updatedTask);

}
catch (err) {

res.status(400).json({
message: err.message,
});

}
});


// DELETE TASK

router.delete("/:id", async (req, res) => {

try {

await Task.findByIdAndDelete(req.params.id);

res.json({
message: "Task Deleted",
});

}
catch (err) {

res.status(500).json({
message: err.message,
});

}
});

module.exports = router;
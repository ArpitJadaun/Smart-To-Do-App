const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
title: {
type: String,
required: true,
},

description: {
type: String,
required: true,
},

priority: {
type: String,
enum: ["Low", "Medium", "High"],
default: "Low",
},

dueDate: {
type: Date,
},

completed: {
type: Boolean,
default: false,
},
},
{
timestamps: true,
}
);

module.exports = mongoose.model("Task", taskSchema);
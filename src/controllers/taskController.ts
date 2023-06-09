import { RequestHandler } from 'express';
import { iTask, Task } from '../models/Task';

export const getAllTasks: RequestHandler = async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

export const createTask: RequestHandler = async (req, res, next) => {
  const newTask: iTask = new Task({
    title: req.body.title,
  });

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  let id = req.params.id;
  const updatedTask: iTask = new Task({
    _id: id,
    title: req.body.title,
    complete: req.body.complete,
  });

  try {
    await Task.findByIdAndUpdate(id, { $set: updatedTask }, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(404).send("Task not found");
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  let itemId = req.params.id;
  let result = await Task.findByIdAndDelete(itemId);
  res.status(200).json(result);
};

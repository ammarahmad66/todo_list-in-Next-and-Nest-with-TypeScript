import express from 'express';
import {
  createTask,
  editTask,
  markTaskAsDone,
  deleteTask,
  getTasksByUser,
  getAllTasks,
  getTasksByID
} from '../controllers/taskController.js';

const taskRoutes = express.Router();

taskRoutes.post('/',createTask);
taskRoutes.put('/:id', editTask);
taskRoutes.patch('/:id/done', markTaskAsDone);
taskRoutes.delete('/:id', deleteTask);
taskRoutes.get('/user/:user_email', getTasksByUser);
taskRoutes.get('/allTasks', getAllTasks);
taskRoutes.get('/:id', getTasksByID);


export default taskRoutes;

import Tasks from '../models/tasks.js';
import User from '../models/user.js';

export const createTask = async (req, res) => {
  const { title, description, user_email, importance } = req.body;

  try {
    // Create a new task
    const newTask = await Tasks.create({ title, description, user_email, importance });

    // Push the task's id to the user's tasks array
    const user = await User.findOne({ where: { email: user_email } });
    if (user) {
      await user.update({ tasks: [...user.tasks, newTask.id] });
    }

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Rest of the code remains the same


export const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, importance } = req.body;

  try {
    // Find the task by ID
    const task = await Tasks.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update task details
    task.title = title;
    task.description = description;
    task.importance = importance;
    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const markTaskAsDone = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the task by ID
    const task = await Tasks.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update task status
    task.status = 'Done';
    await task.save();

    res.status(200).json({ message: 'Task marked as done', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark task as done' });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the task by ID
    const task = await Tasks.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Delete the task
    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

export const getTasksByUser = async (req, res) => {
  const { user_email } = req.params;
  console.log(user_email);
  try {
    // Find all tasks for a specific user
    const tasks = await Tasks.findAll({ where: { user_email } });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

export const getTasksByID = async (req, res) => {
  const { id } = req.params;
  try {
    // Find all tasks for a specific user
    console.log(id);
    const task = await Tasks.findByPk(id);
    if(task){
      res.status(200).json( task );
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    // Retrieve all tasks
    const tasks = await Tasks.findAll();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

import taskModel from "../models/task.model.js";

export const getUserTask = async (req, res) => {
    const { title, description, status } = req.body;
  
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
  
    try {
      const createdTask = await taskModel.create({
        title,
        description,
        status,
        user: req.user._id, // Assuming auth middleware sets req.user
      });
  
      res.status(201).json(createdTask);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };

  export const deleteUserTask = async (req, res) => {
    const { taskId } = req.params; // Get task ID from the URL parameter
  
    try {
      const task = await taskModel.findByIdAndDelete(taskId);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };

  export const updateUserTask = async (req, res) => {
    const { taskId } = req.params; // Get task ID from the URL parameter
    const { title, description, status } = req.body;
  
    try {
      const task = await taskModel.findByIdAndUpdate(
        taskId,
        { title, description, status },
        { new: true } // Return the updated task
      );
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };
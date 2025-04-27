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
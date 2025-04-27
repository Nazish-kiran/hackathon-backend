import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  user: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Task", taskSchema);

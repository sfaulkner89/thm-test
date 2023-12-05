import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    name: { required: true, type: String },
    description: String,
    status: { required: true, type: String },
    priority: String,
    assignee: String
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Task', taskSchema)

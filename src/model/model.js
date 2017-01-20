
import mongoose from 'mongoose'

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
})

export default mongoose.model('Model', modelSchema)

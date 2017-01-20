import mongoose from 'mongoose'
import logger from 'winston'

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
})

modelSchema.statics.foo = async function foo() {
  await Promise.resolve().delay(100)

  logger.info('foo', { bar: 'baz'})
}

export default mongoose.model('Model', modelSchema)

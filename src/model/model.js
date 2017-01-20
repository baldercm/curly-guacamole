import mongoose from 'mongoose'
import logger from 'winston'

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
})

modelSchema.statics.foo = async function foo() {
  return Promise.resolve()
    .delay(100)
    .then(() => logger.info('foo', { bar: 'baz'}))
}

export default mongoose.model('Model', modelSchema)

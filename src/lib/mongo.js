import Bluebird from 'bluebird'
import mongoose from 'mongoose'
import logger from 'winston'

mongoose.Promise = Bluebird

function start(mongoOptions) {
  let mongoUri  = mongoOptions.uri
  let mongoOpts = mongoOptions.options || {}

  mongoose.connection.once('open', () => {
    if (!mongoOpts.quiet) {
      logger.info('Mongoose connected to ' + mongoUri)
    }
  })
  mongoose.connection.on('error', (err) => {
    logger.error('Mongoose connection error: ' + err)
  })
  mongoose.connection.on('close', () => {
    logger.info('Mongoose connection closed')
  })

  return mongoose.connect(mongoUri, mongoOpts)
}

function stop() {
  return mongoose.connection.close()
}

export {start, stop}

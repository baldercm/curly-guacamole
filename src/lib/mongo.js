import Bluebird from 'bluebird'
import mongoose from 'mongoose'

mongoose.Promise = Bluebird

function start(mongoOptions) {
  let mongoUri  = mongoOptions.uri
  let mongoOpts = mongoOptions.options || {}

  mongoose.connection.once('open', () => {
    if (!mongoOpts.quiet) {
      console.log('Mongoose connected to ' + mongoUri)
    }
  })
  mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err)
  })
  mongoose.connection.on('close', () => {
    console.log('Mongoose connection closed')
  })

  return mongoose.connect(mongoUri, mongoOpts)
}

function stop() {
  return mongoose.connection.close()
}

export {start, stop}

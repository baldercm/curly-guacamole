import * as logger  from './logger'
import * as mongo   from './mongo'

function start() {
  return {
    onconfig: async(config, next) => {
      try {
        await logger.start(config.get('logger'))
        await mongo.start(config.get('mongo'))

        next(null, config)
      } catch (err) {
        console.error('Startup error: ', err.stack)
        await stop()
        process.exit(1)
      }
    }
  }
}

async function stop() {
  await mongo.stop()
}

export {start, stop}

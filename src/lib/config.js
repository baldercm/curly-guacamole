import * as logger  from './logger'
import * as mongo   from './mongo'

function start() {
  return {
    onconfig: async(config, next) => {
      console.log('Environment: %s', config.get('env:env'))
      console.log('Initilizating components...')

      try {
        await logger.start(config.get('logger'))
        await mongo.start(config.get('mongo'))

        next(null, config)
      } catch (err) {
        next(err, config)
      }
    }
  }
}

async function stop() {
  await mongo.stop()
}

export {start, stop}

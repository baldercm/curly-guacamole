import path         from 'path'
import * as logger  from './logger'
import * as mongo   from './mongo'

const BASEDIR = path.resolve(__dirname, '..')

function start() {
  return {
    basedir: BASEDIR,
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

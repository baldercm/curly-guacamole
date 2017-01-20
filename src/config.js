'use strict'

import path from 'path'
import * as mongo from './mongo'

const BASEDIR = path.resolve(__dirname, '..')

function start() {
  return {
    basedir: BASEDIR,
    onconfig: async(config, next) => {
      console.log('Configuration loaded, initilizating components')

      try {
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

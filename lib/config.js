'use strict'

import path from 'path'

const BASEDIR = path.resolve(__dirname, '..')

export default function() {
  return {
    basedir: BASEDIR,
    onconfig: (config, next) => {
      console.log('Configuration loaded, initilizating components')
      next(null, config)
    }
  }
}

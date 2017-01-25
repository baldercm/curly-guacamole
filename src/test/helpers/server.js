'use strict'

import path         from 'path'
import express      from 'express'
import kraken       from 'kraken-js'
import * as config  from '../../lib/config'

let server

async function start() {
  let app = express()
  app.use(kraken({
    basedir: path.join(__dirname, '..', '..'),
    onconfig: config.start().onconfig,
  }))

  let running = Promise.fromCallback((done) => app.on('start', done))
  server = app.listen(1337)
  await running

  return server
}

async function stop() {
  await Promise.fromCallback((done) => server.close(done))
  await config.stop()
  server = null
}

export {start, stop}

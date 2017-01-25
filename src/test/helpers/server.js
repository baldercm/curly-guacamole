import path         from 'path'
import express      from 'express'
import kraken       from 'kraken-js'
import * as config  from '../../lib/config'


async function start() {
  let app = express()
  app.use(kraken({
    basedir: path.join(__dirname, '..', '..'),
    onconfig: config.start().onconfig,
  }))

  let running = Promise.fromCallback((done) => app.on('start', done))
  global.APP = app.listen(1337)
  await running
}

async function stop() {
  await Promise.fromCallback((done) => global.APP.close(done))
  await config.stop()
  global.APP = null
}

before(start)
after(stop)

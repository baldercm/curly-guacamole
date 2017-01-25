import express      from 'express'
import kraken       from 'kraken-js'
import logger       from 'winston'
import * as config  from './lib/config'

const app = express()

app.use(kraken(config.start()))
app.on('start', () => {
  logger.info('Environment: %s', app.kraken.get('env:env'))
  logger.info('Application ready to serve requests')
})

const server = app.listen(process.env.PORT || 8080)
server.on('listening', () => {
  logger.info('Server listening on http://localhost:%d', server.address().port)
})
server.on('close', () => {
  logger.info('Server closed')
})

process.on('SIGTERM', shutdown) // docker stop
process.on('SIGINT' , shutdown) // ctrl-C
process.on('SIGUSR2', shutdown) // nodemon restart

async function shutdown() {
  logger.info('Shutting down...')
  await Promise.fromCallback((done) => server.close(done))
  await config.stop()

  logger.info('Will exit now!')
  process.exit(0)
}

export {app, server}

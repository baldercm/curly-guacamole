import express from 'express'
import kraken from 'kraken-js'
import http from 'http'
import * as config from './lib/config'

const app = express()

app.use(kraken(config.start(app)))
app.on('start', () => {
  console.log('Application ready to serve requests.')
  console.log('Environment: %s', app.kraken.get('env:env'))
})

const server = http.createServer(app)
server.listen(process.env.PORT || 8080)
server.on('listening', () => {
  console.log('Server listening on http://localhost:%d', server.address().port)
})


process.on('SIGTERM', shutdown) // docker stop
process.on('SIGINT' , shutdown) // ctrl-C
process.on('SIGUSR2', shutdown) // nodemon restart

async function shutdown() {
  console.log('\nShutting down...')
  await config.stop()

  console.log('Will exit now!')
  process.exit(0)
}

export {app, server}

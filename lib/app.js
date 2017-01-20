'use strict'

import express from 'express'
import kraken from 'kraken-js'
import http from 'http'
import config from './config'

const app = express()

app.use(kraken(config(app)))
app.on('start', function() {
  console.log('Application ready to serve requests.')
  console.log('Environment: %s', app.kraken.get('env:env'))
})

const server = http.createServer(app)
server.listen(process.env.PORT || 8080)
server.on('listening', () => {
  console.log('Server listening on http://localhost:%d', server.address().port)
})

export {app, server}

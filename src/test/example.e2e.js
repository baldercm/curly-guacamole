'use strict'

const request = require('supertest')
import * as server  from './helpers/server'

describe('Example e2e', () => {

  let app

  before(async() => {
    app = await server.start()
  })

  after(async() => {
    await server.stop(app)
  })

  it('GET /', () => {
    return request(app)
      .get('/')
      .expect(200)
      .then(() => {
        return Promise.all([
          expect(Promise.reject()).to.be.rejected,
        ])
      })
  })

  it('GET /error', () => {
    return request(app)
      .get('/error')
      .expect(400)
  })
})

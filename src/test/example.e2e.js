import supertest      from 'supertest'
import Model          from '../model/model'

describe('Example e2e', () => {

  afterEach(() => Promise.all([
    Model.remove(),
  ]))

  describe('GET /', () => {
    beforeEach(() => Promise.all([
      Model.create({name: 'curly-guacamole'}),
    ]))

    it('should get the model', async() => {
      let res = await supertest(global.APP)
        .get('/')
        .expect(200)

      expect(res.body).to.have.property('name', 'curly-guacamole')
    })
  })

  describe('GET /error', () => {
    it('should get an error', async() => {
      let res = await supertest(global.APP)
        .get('/error')
        .expect(400)

      expect(res.body).to.have.property('error', 'ApiError')
    })
  })
})

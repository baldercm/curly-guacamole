import api        from '../lib/api'
import Model      from '../model/model'
import {ApiError} from '../lib/errors'

export default function(router) {
  router.get('/', api(hello))
  router.get('/error/400', api(error400))
  router.get('/error/500', api(error500))
}

async function hello(req, res) {
  await Model.foo()

  let model = await Model.findOne()

  res.status(200).json(model)
  return 'Booking created'
}

async function error400() {
  throw new ApiError()
}

async function error500() {
  throw new Error()
}

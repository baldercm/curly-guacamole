import api        from '../lib/api'
import Model      from '../model/model'
import {ApiError} from '../lib/errors'

export default function(router) {
  router.get('/', api(hello))
  router.get('/error', api(error))
}

async function hello(req, res) {
  await Model.foo()

  let model = await Model.findOne()

  res.status(200).json(model)
  return 'Booking created'
}

async function error() {
  throw new ApiError()
}

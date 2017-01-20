import Model from '../model/model'
import {ApiError} from '../lib/errors'

export default function(router) {
  router.get('/', api(hello))
  router.get('/error', api(error))
}

async function hello(req, res) {
  Model.foo()
  let model = await Model.findOne().exec()

  res.status(200).json(model)
}

async function error() {
  throw new ApiError()
}

function api(handler) {
  return function(req, res, next) {
    Promise.resolve(handler(req, res))
      .then(() => next())
      .catch((err) => next(err))
  }
}

import * as _ from 'lodash'

export default function api(handler) {
  return function(req, res, next) {
    Promise.resolve(handler(req, res))
      .then((outcome) => {
        _.set(res, 'app.outcome', outcome || res.statusMessage)
        next()
      })
      .catch((err) => next(err))
  }
}

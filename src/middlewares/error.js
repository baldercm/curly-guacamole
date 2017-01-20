import * as _     from 'lodash'
import logger     from 'winston'
import {ApiError} from '../lib/errors'

export default function() {
  logger.info('Loading error middleware')

  return function(err, req, res, next) {
    _.set(res, 'app.error', err)

    if (!res.headersSent) {
      if (err instanceof ApiError) {
        res.status(err.status || 400).json({ error: err.message, code: err.code })
      } else {
        res.status(err.status || 500).json({ error: 'Internal Server Error' })
      }
    } else {
      next(err)
    }
  }
}

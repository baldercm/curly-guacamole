import {ApiError} from '../lib/errors'

export default function() {
  return function(err, req, res, next) {
    if (!res.headersSent) {
      if (err instanceof ApiError) {
        res.status(err.status || 400).json({ error: err.message, code: err.code })
      } else {
        res.status(err.status || 500).json({ error: 'Internal Server Error' })
      }
    }

    res.app.error = err
    return next(err)
  }
}

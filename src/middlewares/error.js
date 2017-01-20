import {ApiError} from '../lib/errors'

export default function() {
  return function(err, req, res, next) {
    console.log(1)
    if (!res.headersSent) {
      console.log(2)
      console.log(err)
      if (err instanceof ApiError) {
        console.log(3)
        res.status(err.status || 400).json({ error: err.message, code: err.code })
      } else {
        console.log(4)
        res.status(err.status || 500).json({ error: 'Internal Server Error' })
      }
    }

    res.app.error = err
    return next(err)
  }
}

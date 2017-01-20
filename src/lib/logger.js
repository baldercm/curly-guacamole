import * as _     from 'lodash'
import winston    from 'winston'
import morgan     from 'morgan'
import onFinished from 'on-finished'

const options = {}

function start(opts) {
  _.assign(options, opts)

  winston.configure({
    transports: [
      new (winston.transports.Console)({
        level: options.main.console.level,
        json: options.main.console.json,
        stringify: options.main.console.stringify
      }),
      new (winston.transports.File)({
        level: options.main.file.level,
        filename: options.main.file.filename,
        json: options.access.file.json,
        logstash: options.main.file.json,
      }),
    ]
  })
}

function accessLogger(format, args) {
  let logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level: options.access.console.level,
        json: options.access.console.json,
        stringify: options.access.console.stringify
      }),
      new (winston.transports.File)({
        level: options.access.file.level,
        filename: options.access.file.filename,
        json: options.access.file.json,
        logstash: options.access.file.json,
      }),
    ]
  })

  let accessLogStream = {
    write: function(message){
      message = _.replace(message, /(?:\r\n|\r|\n)/g, '')
      logger.info(message)
    }
  }

  return morgan(format, _.defaults(args, {stream: accessLogStream}))
}

function apiLogger(options) {
  const apiLogger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level: options.api.console.level,
        json: options.api.console.json,
        stringify: options.api.console.stringify
      }),
      new (winston.transports.File)({
        level: options.api.file.level,
        filename: options.api.file.filename,
        json: options.api.file.json,
        logstash: options.api.file.json,
      }),
    ]
  })

  return (req, res, next) => {
    onFinished(res, writeApiLog)
    next()


    function writeApiLog() {
      let message = {
        req: {
          method: req.method,
          url: req.originalUrl,
          body: req.body,
          headers: req.headers,
          ip: req.ip,
        },
        res: {
          status: res.statusCode,
        },
      }

      if (_.get(res, 'app.error')) {
        let err = res.app.error

        message.error = {
          type:     err.name,
          message:  err.message,
          stack:    err.stack,
          causes:   err.causes ? _.map(err.causes, cause => cause.stack) : [_.get(err, 'cause.stack')],
        }

        if (res.statusCode >= 500) {
          apiLogger.error(`Internal Server Error: ${res.app.error.message}`, message)
        } else if (res.statusCode >= 400) {
          apiLogger.error(res.app.error.message, message)
        }
      } else {
        apiLogger.info(res.app.outcome, message)
      }
    }
  }
}

export {start, accessLogger, apiLogger}

import * as _   from 'lodash'
import winston  from 'winston'
import morgan   from 'morgan'

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

const accessLogger = function(format, args) {
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

export {start, accessLogger}

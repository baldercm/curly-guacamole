import winston from 'winston'

function start(options) {
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
        logstash: true,
      }),
    ]
  })
}

export {start}

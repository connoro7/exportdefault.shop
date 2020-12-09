import winston from 'winston'
import path from 'path'
import appRoot from 'app-root-path'

const __dirname = path.resolve()
const PROJECT_ROOT = path.join(__dirname, '..')

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/winston.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true,
  },
  console: {
    level: 'info',
    handleExceptions: false,
    json: false,
    colorize: true,
    timestamp: true,
  },
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.json()
  ),
  defaultMeta: { service: 'exportdefault' },
  transports: [
    // Uncomment to enable printing logs to file
    // new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
})

logger.stream = {
  write: (message) => {
    logger.info(message)
  },
}

/**
 * Attempts to add file and line number info to the given log arguments.
 */
function formatLogArguments(args) {
  args = Array.prototype.slice.call(args)

  var stackInfo = getStackInfo(1)

  if (stackInfo) {
    // get file path relative to project root
    var calleeStr = '(' + stackInfo.relativePath + ':' + stackInfo.line + ')'

    if (typeof args[0] === 'string') {
      args[0] = calleeStr + ' ' + args[0]
    } else if (args[0].constructor === Object) {
      args[0] = calleeStr + ' ' + JSON.stringify(args[0], null, 4)
    } else {
      args.unshift(calleeStr)
    }
  }

  return args
}

/**
 * Parses and returns info about the call stack at the given index.
 */
function getStackInfo(stackIndex) {
  // get call stack, and analyze it
  // get all file, method, and line numbers
  var stacklist = new Error().stack.split('\n').slice(3)

  // stack trace format:
  // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
  var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
  var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi

  var s = stacklist[stackIndex] || stacklist[0]
  var sp = stackReg.exec(s) || stackReg2.exec(s)

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join('\n'),
    }
  }
}

// A custom logger interface that wraps winston, making it easy to instrument code and still possible to replace winston in the future.

logger.debug = () => {
  logger.debug.apply(logger, formatLogArguments(arguments))
}

logger.info = () => {
  logger.info.apply(logger, formatLogArguments(arguments))
}

logger.warn = () => {
  logger.warn.apply(logger, formatLogArguments(arguments))
}

logger.error = () => {
  logger.error.apply(logger, formatLogArguments(arguments))
}

export default logger

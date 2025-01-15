import { LOG_LEVELS, LOG_TYPES } from './config'
import { Logger } from './logger'

// 创建操作日志和异常日志实例
const operationLogger = new Logger(LOG_TYPES.OPERATION)
const exceptionLogger = new Logger(LOG_TYPES.EXCEPTION)

export const logger = {
  // 操作日志方法
  operation: {
    info: (message) => operationLogger.write(LOG_LEVELS.INFO, message),
    debug: (message) => operationLogger.write(LOG_LEVELS.DEBUG, message),
    warn: (message) => operationLogger.write(LOG_LEVELS.WARN, message)
  },
  // 异常日志方法
  exception: {
    error: (message, error) =>
      exceptionLogger.write(LOG_LEVELS.ERROR, message, {
        stack: error?.stack || error?.toString()
      })
  }
}

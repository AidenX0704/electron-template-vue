import path from 'path'
import { app } from 'electron'

export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
}

export const LOG_TYPES = {
  OPERATION: 'operation',
  EXCEPTION: 'exception'
}

// 日志文件路径配置
export const logConfig = {
  // 日志根目录
  baseLogPath: path.join(app.getPath('userData'), 'logs'),
  // 操作日志配置
  operation: {
    filename: 'operation.log',
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 10, // 保留10个历史文件
    format: '[{timestamp}] [{level}] {message}'
  },
  // 异常日志配置
  exception: {
    filename: 'exception.log',
    maxSize: 10 * 1024 * 1024,
    maxFiles: 10,
    format: '[{timestamp}] [{level}] {message}\n{stack}'
  }
}

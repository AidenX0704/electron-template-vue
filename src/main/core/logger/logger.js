import fs from 'fs'
import path from 'path'
import { format as formatDate } from 'date-fns'
import { LOG_TYPES, logConfig } from './config'

export class Logger {
  constructor(type) {
    this.type = type
    this.config = logConfig[type]
    this.logPath = path.join(logConfig.baseLogPath, this.config.filename)
    this.initLogDirectory()
  }

  initLogDirectory() {
    if (!fs.existsSync(logConfig.baseLogPath)) {
      fs.mkdirSync(logConfig.baseLogPath, { recursive: true })
    }
  }

  formatMessage(level, message, extra = {}) {
    const timestamp = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
    let logMessage = this.config.format
      .replace('{timestamp}', timestamp)
      .replace('{level}', level)
      .replace('{message}', message)

    if (extra.stack) {
      logMessage = logMessage.replace('{stack}', extra.stack)
    }

    return logMessage + '\n'
  }

  async write(level, message, extra = {}) {
    const formattedMessage = this.formatMessage(level, message, extra)

    try {
      // 检查文件大小是否需要轮转
      await this.rotateLogIfNeeded()

      // 写入日志
      await fs.promises.appendFile(this.logPath, formattedMessage, 'utf8')

      // 如果是异常日志，通知用户
      if (this.type === LOG_TYPES.EXCEPTION) {
        this.notifyUser(message, extra)
      }
    } catch (error) {
      console.error('Failed to write log:', error)
    }
  }

  async rotateLogIfNeeded() {
    try {
      const stats = await fs.promises.stat(this.logPath).catch(() => ({ size: 0 }))

      if (stats.size >= this.config.maxSize) {
        // 轮转历史日志文件
        for (let i = this.config.maxFiles - 1; i > 0; i--) {
          const oldPath = `${this.logPath}.${i}`
          const newPath = `${this.logPath}.${i + 1}`

          if (fs.existsSync(oldPath)) {
            await fs.promises.rename(oldPath, newPath)
          }
        }

        // 重命名当前日志文件
        if (fs.existsSync(this.logPath)) {
          await fs.promises.rename(this.logPath, `${this.logPath}.1`)
        }
      }
    } catch (error) {
      console.error('Failed to rotate log:', error)
    }
  }

  notifyUser(message, extra) {
    // 发送 IPC 消息到渲染进程显示错误通知
    global.windowManager.getWindow('main')?.webContents.send('show-error-upload-dialog', {
      message,
      error: extra,
      logPath: this.logPath
    })
  }
}

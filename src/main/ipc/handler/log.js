import { ipcMain } from 'electron'
import { LogUploader } from '../../core/logger/uploader'

const logUploader = new LogUploader('http://116.62.142.108/upload/logs')

export function registerLogHandlers() {
  // 处理日志上传请求
  ipcMain.handle('upload-error-log', async (event, logPath) => {
    try {
      await logUploader.uploadLog(logPath)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  })
}

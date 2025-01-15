import fs from 'fs'
import { net } from 'electron'

export class LogUploader {
  constructor(uploadUrl) {
    this.uploadUrl = uploadUrl
  }

  async uploadLog(logPath) {
    try {
      const logContent = await fs.promises.readFile(logPath, 'utf8')

      // 构建上传数据
      const formData = {
        log: logContent,
        timestamp: new Date().toISOString(),
        appVersion: process.env.APP_VERSION,
        platform: process.platform,
        arch: process.arch
      }

      // 使用 Electron 的 net 模块上传
      const request = net.request({
        method: 'POST',
        url: this.uploadUrl,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return new Promise((resolve, reject) => {
        request.on('response', (response) => {
          if (response.statusCode === 200) {
            resolve(true)
          } else {
            reject(new Error(`Upload failed with status ${response.statusCode}`))
          }
        })

        request.on('error', reject)
        request.write(JSON.stringify(formData))
        request.end()
      })
    } catch (error) {
      throw new Error(`Failed to upload log: ${error.message}`)
    }
  }
}

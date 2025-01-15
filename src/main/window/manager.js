import { WindowStateStore } from '../utils/store'
import { WindowPreloader } from '../utils/preloader'
import { WindowEventBus } from './communication/event-bus'
import logger from '../core/logger'

export class WindowManager {
  constructor() {
    this.windows = new Map()
    this.stateStore = new WindowStateStore()
    this.preloader = new WindowPreloader()
    this.eventBus = new WindowEventBus()

    this.setupEventBus()
  }

  setupEventBus() {
    // 示例：监听窗口通信
    this.eventBus.onBroadcast('windowAction', (data) => {
      logger.operation.info('Window action broadcast:', data)
    })
  }

  createWindow(name, WindowClass, ...args) {
    try {
      // 检查是否有预加载的窗口
      let window = this.preloader.getPreloadedWindow(WindowClass)

      if (!window) {
        window = new WindowClass(...args, this.stateStore)
        window.create()
      } else {
        this.preloader.removePreloadedWindow(WindowClass)
      }

      this.windows.set(name, window)
      logger.operation.info(`Window created: ${name}`)

      return window.window
    } catch (error) {
      logger.exception.error(`Failed to create window: ${name}`, error)
      return null
    }
  }

  // 预加载窗口
  preloadWindow(WindowClass, config) {
    return this.preloader.preload(WindowClass, config)
  }

  // 发送消息到指定窗口
  sendMessage(toWindow, eventName, data) {
    this.eventBus.emit(toWindow, eventName, data)
  }

  // 广播消息到所有窗口
  broadcast(eventName, data) {
    this.eventBus.broadcast(eventName, data)
  }
}

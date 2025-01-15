import { BrowserWindow } from 'electron'
import { WindowAnimator } from '../utils/animator'
import { DisplayManager } from '../utils/display'

export class BaseWindow {
  constructor(config = {}, windowStateStore) {
    this.config = config
    this.window = null
    this.stateStore = windowStateStore
    this.windowName = this.constructor.name
  }

  create() {
    // 获取保存的窗口状态
    const savedState = this.stateStore.getWindowState(this.windowName)

    // 合并配置
    const finalConfig = {
      ...this.config,
      ...(savedState
        ? {
            x: savedState.x,
            y: savedState.y,
            width: savedState.width,
            height: savedState.height
          }
        : {})
    }

    // 如果没有保存的状态，计算居中位置
    if (!savedState) {
      const display = DisplayManager.getBestDisplay(this.config.preferredDisplay)
      const center = DisplayManager.calculateCenterPosition(
        display,
        finalConfig.width,
        finalConfig.height
      )
      finalConfig.x = center.x
      finalConfig.y = center.y
    }

    this.window = new BrowserWindow(finalConfig)

    // 恢复最大化状态
    if (savedState?.isMaximized) {
      this.window.maximize()
    }

    this.bindEvents()
    this.loadContent()

    return this.window
  }

  bindEvents() {
    // 保存窗口状态
    const saveState = () => {
      this.stateStore.saveWindowState(this.windowName, this)
    }

    this.window.on('resize', saveState)
    this.window.on('move', saveState)
    this.window.on('close', saveState)
  }

  async show() {
    if (this.window) {
      await WindowAnimator.fadeIn(this.window)
    }
  }

  async hide() {
    if (this.window) {
      await WindowAnimator.fadeOut(this.window)
    }
  }
}

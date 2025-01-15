export class WindowPreloader {
  constructor() {
    this.preloadedWindows = new Map()
  }

  // 预加载窗口
  preload(WindowClass, config) {
    const window = new WindowClass(config)
    const browserWindow = window.create()

    // 隐藏窗口但加载内容
    browserWindow.hide()

    this.preloadedWindows.set(WindowClass.name, window)
    return window
  }

  // 获取预加载的窗口
  getPreloadedWindow(WindowClass) {
    return this.preloadedWindows.get(WindowClass.name)
  }

  // 移除预加载的窗口
  removePreloadedWindow(WindowClass) {
    this.preloadedWindows.delete(WindowClass.name)
  }
}

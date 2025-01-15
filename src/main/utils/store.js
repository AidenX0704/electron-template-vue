import Store from 'electron-store'
import { screen } from 'electron'

export class WindowStateStore {
  constructor() {
    this.store = new Store({
      name: 'window-state',
      defaults: {}
    })
  }

  // 获取窗口状态
  getWindowState(name) {
    const state = this.store.get(`windows.${name}`)
    if (!state) return null

    // 验证位置是否在可用显示器范围内
    const displays = screen.getAllDisplays()
    const isValidPosition = displays.some((display) => {
      const bounds = display.bounds
      return (
        state.x >= bounds.x &&
        state.x <= bounds.x + bounds.width &&
        state.y >= bounds.y &&
        state.y <= bounds.y + bounds.height
      )
    })

    return isValidPosition ? state : null
  }

  // 保存窗口状态
  saveWindowState(name, windowInstance) {
    if (!windowInstance) return

    const win = windowInstance.window
    const state = {
      x: win.getPosition()[0],
      y: win.getPosition()[1],
      width: win.getSize()[0],
      height: win.getSize()[1],
      isMaximized: win.isMaximized(),
      display: screen.getDisplayMatching(win.getBounds()).id
    }

    this.store.set(`windows.${name}`, state)
  }
}

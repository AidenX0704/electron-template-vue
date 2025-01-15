import { screen } from 'electron'

export class DisplayManager {
  static getAllDisplays() {
    return screen.getAllDisplays()
  }

  static getPrimaryDisplay() {
    return screen.getPrimaryDisplay()
  }

  static getDisplayById(id) {
    return this.getAllDisplays().find(display => display.id === id)
  }

  // 获取最适合的显示器
  static getBestDisplay(preferredDisplay) {
    if (preferredDisplay) {
      const display = this.getDisplayById(preferredDisplay)
      if (display) return display
    }
    return this.getPrimaryDisplay()
  }

  // 计算在指定显示器上的居中位置
  static calculateCenterPosition(display, width, height) {
    return {
      x: Math.round(display.bounds.x + (display.bounds.width - width) / 2),
      y: Math.round(display.bounds.y + (display.bounds.height - height) / 2)
    }
  }
}

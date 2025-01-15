import { app } from "electron";

export const trayMenuTemplate = [
  {
    label: '显示主窗口',
    click: () => {
      global.windowManager.showWindow('main')
    }
  },
  {
    label: '偏好设置',
    click: () => {
      global.windowManager.showWindow('settings')
    }
  },
  { type: 'separator' },
  {
    label: '检查更新',
    click: () => {
      global.autoUpdater.checkForUpdates()
    }
  },
  { type: 'separator' },
  {
    label: '退出',
    click: () => {
      app.quit()
    }
  }
]

// 托盘图标配置
export const trayConfig = {
  icon: {
    normal: '/path/to/tray-icon.png',
    pressed: '/path/to/tray-icon-pressed.png'  // macOS
  },
  tooltip: '应用名称',
  // 右键菜单显示的模板
  contextMenu: trayMenuTemplate
}

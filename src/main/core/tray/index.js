import { Tray, Menu } from 'electron'
import { trayMenuTemplate, trayConfig } from './template'

export function createTray() {
  const tray = new Tray(trayConfig.icon.normal)

  tray.setToolTip(trayConfig.tooltip)
  tray.setContextMenu(Menu.buildFromTemplate(trayMenuTemplate))

  // macOS 点击托盘图标显示主窗口
  if (process.platform === 'darwin') {
    tray.on('click', () => {
      global.windowManager.showWindow('main')
    })
  }

  return tray
}

import { app } from 'electron'
import { isMac } from '../utils'

// 主菜单模板
export const mainMenuTemplate = [
  // macOS 应用菜单
  ...(isMac
    ? [
      {
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          {
            label: '偏好设置',
            accelerator: 'CmdOrCtrl+,',
            click: (menuItem, browserWindow, event) => {
              // 打开设置窗口的处理函数
              global.windowManager.showWindow('settings')
            }
          },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }
    ]
    : []),

  // 文件菜单
  {
    label: '文件',
    submenu: [
      {
        label: '新建项目',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          // 新建项目处理
        }
      },
      {
        label: '打开项目',
        accelerator: 'CmdOrCtrl+O',
        click: () => {
          // 打开项目处理
        }
      },
      { type: 'separator' },
      {
        label: '保存',
        accelerator: 'CmdOrCtrl+S',
        click: () => {
          // 保存处理
        }
      },
      {
        label: '另存为...',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: () => {
          // 另存为处理
        }
      }
    ]
  },

  // 编辑菜单
  {
    label: '编辑',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [{ role: 'delete' }, { role: 'selectAll' }]
        : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
    ]
  },

  // 视图菜单
  {
    label: '视图',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },

  // 帮助菜单
  {
    role: 'help',
    submenu: [
      {
        label: '查看文档',
        click: async () => {
          // 打开文档链接
          const { shell } = require('electron')
          await shell.openExternal('https://your-docs-url.com')
        }
      },
      {
        label: '检查更新',
        click: () => {
          // 检查更新处理
          global.autoUpdater.checkForUpdates()
        }
      },
      { type: 'separator' },
      {
        label: '关于',
        click: () => {
          // 显示关于对话框
          global.windowManager.createModalWindow({
            name: 'about',
            config: {
              /* 关于窗口配置 */
            }
          })
        }
      }
    ]
  }
]

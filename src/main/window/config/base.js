export const baseConfig = {
  title: 'Electron',
  width: 1200,
  height: 800,
  minWidth: 800,
  minHeight: 600,
  show: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    webSecurity: true,
    devTools: true
  }
}

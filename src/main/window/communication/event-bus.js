import { EventEmitter } from 'events'

export class WindowEventBus {
  constructor() {
    this.emitter = new EventEmitter()
  }

  // 发送事件到指定窗口
  emit(windowName, eventName, data) {
    this.emitter.emit(`${windowName}:${eventName}`, data)
  }

  // 广播事件到所有窗口
  broadcast(eventName, data) {
    this.emitter.emit(`broadcast:${eventName}`, data)
  }

  // 监听特定窗口的事件
  on(windowName, eventName, callback) {
    this.emitter.on(`${windowName}:${eventName}`, callback)
  }

  // 监听广播事件
  onBroadcast(eventName, callback) {
    this.emitter.on(`broadcast:${eventName}`, callback)
  }

  // 移除监听器
  off(windowName, eventName, callback) {
    this.emitter.off(`${windowName}:${eventName}`, callback)
  }
}

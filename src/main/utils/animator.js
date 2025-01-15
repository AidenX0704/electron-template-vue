export class WindowAnimator {
  static async fadeIn(window, duration = 300) {
    window.show()
    window.setOpacity(0)

    const steps = 20
    const increment = 1 / steps
    const stepDuration = duration / steps

    for (let i = 0; i <= steps; i++) {
      window.setOpacity(i * increment)
      await new Promise(resolve => setTimeout(resolve, stepDuration))
    }
  }

  static async fadeOut(window, duration = 300) {
    const steps = 20
    const decrement = 1 / steps
    const stepDuration = duration / steps

    for (let i = steps; i >= 0; i--) {
      window.setOpacity(i * decrement)
      await new Promise(resolve => setTimeout(resolve, stepDuration))
    }

    window.hide()
    window.setOpacity(1)
  }
}

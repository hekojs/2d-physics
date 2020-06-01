import Heko from '@hekojs/core'
import HekoHelpers from '@hekojs/helpers'
import Matter from 'matter-js'
import _ from 'lodash'

// TODO
export default class extends Heko.Component {
  static class = 'CanMove'

  speed = 0.01
  inertia = 0.2
  options = {
    changeAngle: true
  }

  constructor (entity, attributes) {
    super(entity)
    this.merge(attributes)

    this.task = new HekoHelpers.Task
    this.moving = false
    this.velocity = {
      x: 0,
      y: 0
    }
  }

  toAngle ({ angle, speed = 100, options = {} } = {}) {
    this.moving = true

    if (_.merge(this.options, options).changeAngle) {
      this.entity.canRotate.toAngle({ angle })
    }

    this._setVelocity({
      x: Math.cos(Heko.Angle.toRadian(angle - 90)) * this.speed * (speed / 100),
      y: Math.sin(Heko.Angle.toRadian(angle - 90)) * this.speed * (speed / 100)
    })
  }

  toPoint ({ x, y, options = {} } = {}) {
    let angle = Heko.Angle.fromPointToPoint(this.entity.hasPosition.x, this.entity.hasPosition.y, x, y)

    // Accelerate
    this._setVelocity({
      x: Math.cos(Heko.Angle.toRadian(angle)) * this.speed,
      y: Math.sin(Heko.Angle.toRadian(angle)) * this.speed
    })

    this.task.create(() => {
      // Facing to destination
      let angle = Heko.Angle.fromPointToPoint(this.entity.hasPosition.x, this.entity.hasPosition.y, x, y)
      this.toAngle({ angle: angle, options })

      let distance = Heko.Distance.fromPointToPoint(this.entity.hasPosition.x, this.entity.hasPosition.y, x, y)
      let speed = Math.abs(this.velocity.x) + Math.abs(this.velocity.y)
      if (distance < (speed / 4)) {
        this.stop()
      }
    })
  }

  stop ({ instant = false } = {}) {
    this.moving = false
    this.task.stop()
    this.entity.world.gsap.killTweensOf(this.velocity)
    if (instant) this.velocity = { x: 0, y: 0 }
    else this._setVelocity({ x: 0, y: 0 })
  }

  isMoving () {
    return this.moving
  }

  _setVelocity ({ x, y }) {
    this.entity.world.gsap.killTweensOf(this.velocity)
    this.entity.world.gsap.to(this.velocity, { x, y, duration: this.inertia })
  }

  update ({ tps }) {
    this.task.update({ tps })

    if (this.velocity.x !== 0) this.entity.components.physics.body.force.x = this.velocity.x / tps
    if (this.velocity.y !== 0) this.entity.components.physics.body.force.y = this.velocity.y / tps
  }
}
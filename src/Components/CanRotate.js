import Heko from '@hekojs/core'
import Matter from 'matter-js'

// TODO
export default class extends Heko.Component {
  static class = 'CanRotate'

  inertia = 0.2

  constructor (entity, attributes) {
    super(entity)
    this.merge(attributes)

    this.animation = {
      angle: 0
    }
  }

  toAngle ({ angle }) {
    this.entity.world.gsap.killTweensOf(this.animation, 'angle')
    this.entity.world.gsap.fromTo(this.animation, {
      angle: Heko.Angle.toDeegree(this.entity.components.physics.body.angle)
    }, {
      angle,
      duration: this.inertia,
      onUpdate: () => {
        Matter.Body.setAngle(this.entity.components.physics.body, Heko.Angle.toRadian(this.animation.angle))
      },
    })
  }

  toPoint ({ x, y }) {
    this.toAngle({ angle: Heko.Angle.fromPointToPoint(this.entity.hasPosition.x, this.entity.hasPosition.y, x, y) })
  }
}
import Heko from '@hekojs/core'
import HekoHelpers from '@hekojs/helpers'
import Matter from 'matter-js'
import Plugin from '../Plugin'

export default class Physics extends Heko.Component {
  static attributes () {
    return {
      body: null,
      position: new Heko.Schema.MapSchema({ x: 0, y: 0 }),
      angle: 0,
      velocity: new Heko.Schema.MapSchema({ x: 0, y: 0, angle: 0 })
    }
  }
  static multiplayerSchema = {
    position: { map: 'float32' },
    angle: 'float32',
    velocity: { map: 'float32' },
  }

  onAdd () {
    if(!this.body) return false

    this.body._entityId = this.getEntity()._id

    Matter.World.add(this._getMatterWorld(), this.body)
  }

  onRemove () {
    if(!this.body) return false

    Matter.World.remove(this._getMatterWorld(), this.body)
  }

  _getMatterWorld () {
    return this.getWorld().plugins.get(Plugin).matter.world
  }

  setPosition ({ x = null, y = null } = {}) {
    if(!this.body) return false

    if (x === null) x = this.body.position.x
    if (y === null) y = this.body.position.y

    Matter.Body.setPosition(this.body, { x: x, y: y })
  }

  setAngle ({ angle }) {
    if(!this.body) return false

    angle = HekoHelpers.Angle.normalize(angle)

    Matter.Body.setAngularVelocity(this.body, 0)
    Matter.Body.setAngle(this.body, HekoHelpers.Angle.toRadian(angle))
  }

  setVelocity ({ x = null, y = null, angle = null } = {}) {
    if(!this.body) return false

    if (x === null) x = this.body.velocity.x
    if (y === null) y = this.body.velocity.y

    Matter.Body.setVelocity(this.body, { x, y })

    if (angle !== null) {
      this.velocity.angle = angle
      Matter.Body.setAngularVelocity(this.body, angle)
    }
  }

  applyForce({x, y}) {
    if(!this.body) return false

    Matter.Body.applyForce(this.body, this.body.position, {x, y})
  }

  onMultiplayerServerUpdate ({ position, angle, velocity }) {
    this.setPosition(position)
    this.setAngle({ angle })
    this.setVelocity(velocity)
  }
}
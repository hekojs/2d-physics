import Heko from '@hekojs/core'
import HekoHelpers from '@hekojs/helpers'
import Matter from 'matter-js'
import Physics from '../Components/Physics'

const round = HekoHelpers.Number.round

export default class PhysicsPlugin extends Heko.System {
  static queries = {
    entities: { components: [Physics] }
  }

  onAdd({ physics }) {
    this.physics = physics
  }

  onTick() {
    this._updateEngine()
    this._updatePositions()
  }

  _updateEngine() {
    Matter.Engine.update(this.physics.matter, 1000 / this.getWorld().ticker.tps())
  }

  _updatePositions() {
    this.queries.entities.results.forEach(entity => {
      const physics = entity.getComponent(Physics)

      if(physics.body) {
        physics.position.x = physics.body.position.x
        physics.position.y = physics.body.position.y
        physics.angle = round(HekoHelpers.Angle.normalize(HekoHelpers.Angle.toDeegree(physics.body.angle)), 1)

        physics.velocity.x = round(physics.body.velocity.x, 2)
        physics.velocity.y = round(physics.body.velocity.y, 2)
        physics.velocity.angle = round(physics.body.angularVelocity, 2)
      }
    })
  }
}
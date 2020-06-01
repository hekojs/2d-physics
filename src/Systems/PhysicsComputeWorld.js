import Heko from '@hekojs/core'
import Matter from 'matter-js'

export default class PhysicsComputeWorld extends Heko.System {
  onAdd({ physics }) {
    this.physics = physics
  }

  onTick() {
    Matter.Engine.update(this.physics.matter, 1000 / this.getWorld().ticker.tps())
  }
}
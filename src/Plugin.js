import Matter from 'matter-js'
import decomp from 'poly-decomp'
import PhysicsComputeWorld from './Systems/PhysicsComputeWorld'
import PhysicsComputePositions from './Systems/PhysicsComputePositions'

const app = typeof window !== 'undefined' ? window : global
app.decomp = decomp

export default class Physics {
  constructor (world, options) {
    this.world = world
    this.matter = Matter.Engine.create()

    this.options = Object.assign({
      setup: () => {}
    }, options)
  }

  onStart () {
    this.options.setup({ world: this.matter.world })
    this.world.systems.add(PhysicsComputeWorld, { physics: this })
    this.world.systems.add(PhysicsComputePositions)
  }
}
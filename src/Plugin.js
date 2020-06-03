import Matter from 'matter-js'
import decomp from 'poly-decomp'
import PhysicsPlugin from './Systems/PhysicsPlugin'

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
    this.options.setup({ matterWorld: this.matter.world })
    this.world.systems.add(PhysicsPlugin, { physics: this })
  }
}
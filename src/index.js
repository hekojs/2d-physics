import Heko from '@hekojs/core'
import Plugin from './Plugin'
import Matter from 'matter-js'
import Components from './Components'
import Systems from './Systems'

Heko.registerComponents(Components)

export default {
  Components,
  Systems,
  Matter,
  Plugin
}
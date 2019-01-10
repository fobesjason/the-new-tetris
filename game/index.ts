import { Game } from './game'
import { Physics } from 'excalibur'

Physics.enabled = false

new Game(10, 20).start()

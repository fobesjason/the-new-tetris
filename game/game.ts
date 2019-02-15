import { Action, Jar } from './jar'
import { DisplayMode, Engine, Input } from 'excalibur'

export class Game extends Engine {

    private jar: Jar

    constructor(width: number, height: number) {
        super({ displayMode: DisplayMode.FullScreen })

        this.input.keyboard.on('press', event => {
            if (this.currentScene == this.jar) {
                switch (event.key) {
                    case Input.Keys.Left:
                    case Input.Keys.A:
                        this.jar.moveCurrentPiece(Action.MoveLeft)
                        break
                    case Input.Keys.Right:
                    case Input.Keys.D:
                    this.jar.moveCurrentPiece(Action.MoveRight)
                        break
                    case Input.Keys.Up:
                    case Input.Keys.W:
                        this.jar.moveCurrentPiece(Action.SnapDown)
                        break
                    case Input.Keys.E:
                        this.jar.moveCurrentPiece(Action.RotateClockwise)
                        break
                    case Input.Keys.Q:
                        this.jar.moveCurrentPiece(Action.RotateCounterclockwise)
                        break
                }
            }
        })
        
        this.input.keyboard.on('hold', event => {
            if (this.currentScene == this.jar) {
                switch (event.key) {
                    case Input.Keys.Down:
                    case Input.Keys.S:
                        this.jar.moveCurrentPiece(Action.MoveDown)
                        break
                }
            }
        })

        this.jar = new Jar(width, height)
        this.add("Tetris Jar", this.jar)

        this.start()
        this.goToScene("Tetris Jar")
    }

}

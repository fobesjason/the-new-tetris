import { DisplayMode, Engine } from 'excalibur'
import { Coordinate } from './elements/coordinate'
import { Grid } from './grid'
import { HookPieceJ, HookPieceL, LightningPieceS, LightningPieceZ, PyramidPiece, SquarePiece, StraightPiece } from './elements/tetrisPiece'
import { Input } from 'excalibur'
import { Piece } from './elements/piece'

export class Game {

    engine: Engine
    grid: Grid
    startingPosition: Coordinate
    private currentPiece: Piece

    constructor(width: number, height: number) {
        this.engine = new Engine({ displayMode: DisplayMode.FullScreen })

        this.engine.input.keyboard.on('press', event => {
            if (this.currentPiece != null) {
                switch (event.key) {
                    case Input.Keys.Left:
                    case Input.Keys.A:
                        this.currentPiece.moveLeft()
                        break
                    case Input.Keys.Right:
                    case Input.Keys.D:
                        this.currentPiece.moveRight()
                        break
                    case Input.Keys.E:
                        this.currentPiece.rotateClockwise()
                        break
                    case Input.Keys.Q:
                        this.currentPiece.rotateCounterclockwise()
                        break
                }
            }
        })
        
        this.engine.input.keyboard.on('hold', event => {
            if (this.currentPiece != null) {
                switch (event.key) {
                    case Input.Keys.Down:
                    case Input.Keys.S:
                        this.currentPiece.moveDown()
                        break
                }
            }
        })
        
        this.grid = new Grid(this.engine, new Coordinate(width, height))
        this.startingPosition = new Coordinate(5, 5)

        this.engine.start()
    }

    start() {
        // new StraightPiece(this).addToGrid()
        // new LightningPieceS(this).addToGrid()
        // new LightningPieceZ(this).addToGrid()
        // new PyramidPiece(this).addToGrid()
        // new HookPieceJ(this).addToGrid()
        // new HookPieceL(this).addToGrid()
        this.currentPiece = new HookPieceJ(this)
    }

}

import { Actor, Color, CollisionType, Engine, Scene } from 'excalibur'
import { Coordinate } from './elements/coordinate'
import { Grid } from './grid'
import { HookPieceJ, HookPieceL, LightningPieceS, LightningPieceZ, PyramidPiece, SquarePiece, StraightPiece } from './elements/tetrisPiece'
import { Piece } from './elements/piece'

export enum Action {
    MoveDown = 0,
    MoveLeft = 1,
    MoveRight = 2,
    RotateClockwise = 3,
    RotateCounterclockwise = 4,
    SnapDown = 5,
}

export class Jar extends Scene {

    grid: Grid
    startingPosition: Coordinate
    private currentPiece: Piece
    private gridSize: Coordinate

    constructor(width: number, height: number) {
        super()

        this.gridSize = new Coordinate(width, height)
        this.grid = new Grid(this.gridSize)
        this.startingPosition = new Coordinate(Math.floor(width / 2) - 1, 0)
    }

    /*
     * Override method
     * This is called before the first update of the Scene.
    **/
    onInitialize(engine: Engine) {
        //Top border
        this.add(new Actor({
            x: Grid.convertToPixel(this.gridSize.x) / 2,
            y: Grid.convertToPixel(2),
            width: Grid.convertToPixel(this.gridSize.x),
            height: 1,
            color: Color.White,
            collisionType: CollisionType.PreventCollision
        }))

        //Left border
        this.add(new Actor({
            x: 0,
            y: (Grid.convertToPixel(this.gridSize.y) / 2) + Grid.convertToPixel(2),
            width: 1,
            height: Grid.convertToPixel(this.gridSize.y),
            color: Color.White,
            collisionType: CollisionType.PreventCollision
        }))

        //Right border
        this.add(new Actor({
            x: Grid.convertToPixel(this.gridSize.x) + 1,
            y: (Grid.convertToPixel(this.gridSize.y) / 2) + Grid.convertToPixel(2),
            width: 1,
            height: Grid.convertToPixel(this.gridSize.y),
            color: Color.White,
            collisionType: CollisionType.PreventCollision
        }))

        //Bottom border
        this.add(new Actor({
            x: Grid.convertToPixel(this.gridSize.x) / 2,
            y: Grid.convertToPixel(this.gridSize.y) + 1 + Grid.convertToPixel(2),
            width: Grid.convertToPixel(this.gridSize.x),
            height: 1,
            color: Color.White,
            collisionType: CollisionType.PreventCollision
        }))
    }

    /*
     * Override method
     * Updates all the actors and timers in the scene. Called by the Engine.
    **/
    update(engine: Engine, delta: number) {
        super.update(engine, delta)

        if (this.currentPiece == null) {
            this.currentPiece = this.getRandomPiece()
        }
        this.currentPiece.moveDown(1)
    }

    moveCurrentPiece(action: Action) {
        if (this.currentPiece != null) {
            switch (action) {
                case Action.MoveDown:
                    this.currentPiece.moveDown()
                    break
                case Action.MoveLeft:
                    this.currentPiece.moveLeft()
                    break
                case Action.MoveRight:
                    this.currentPiece.moveRight()
                    break
                case Action.RotateClockwise:
                    this.currentPiece.rotateClockwise()
                    break
                case Action.RotateCounterclockwise:
                    this.currentPiece.rotateCounterclockwise()
                    break
                case Action.SnapDown:
                    this.currentPiece.snapDown()
                    break
            }
        }
    }

    private getRandomPiece() {
        switch (Math.floor(Math.random() * 7)) {
            case 0:
                return new HookPieceJ(this)
            case 1:
                return new HookPieceL(this)
            case 2:
                return new LightningPieceS(this)
            case 3:
                return new LightningPieceZ(this)
            case 4:
                return new PyramidPiece(this)
            case 5:
                return new SquarePiece(this)
            case 6:
                return new StraightPiece(this)
        }
    }

}

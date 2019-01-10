import { Actor, CollisionType, Color } from 'excalibur'
import { Coordinate } from './coordinate'
import { Game } from '../game'
import { Grid } from '../grid'

export class Square extends Actor {

    static size = 20.0
    static offset = Square.size / 2

    private game: Game

    constructor(game: Game, position: Coordinate, color: Color) {
        super({
            x: Grid.convertToPixel(position.x) + Square.offset,
            y: Grid.convertToPixel(position.y) + Square.offset,
            width: Square.size,
            height: Square.size,
            color: color,
            collisionType: CollisionType.PreventCollision
        })

        this.game = game
        this.game.engine.add(this)
    }

    moveLeft() {
        if (this.canMoveLeft()) {
            this.pos.x -= Grid.convertToPixel(1)
        }
    }

    canMoveLeft() {
        var overlap = Grid.getGridOverlap(this.pos.y)
        if (this.game.grid.isEmpty(Grid.getGridLocation(this.pos.x - Grid.convertToPixel(1), this.pos.y))
                && (overlap == .5 || 
                    ((overlap < .5 && this.game.grid.isEmpty(Grid.getGridLocation(this.pos.x - Grid.convertToPixel(1), this.pos.y - Grid.convertToPixel(1))))
                    || (overlap > .5 && this.game.grid.isEmpty(Grid.getGridLocation(this.pos.x - Grid.convertToPixel(1), this.pos.y + Grid.convertToPixel(1))))))) {
            return true
        }
        return false
    }

    moveRight() {
        if (this.canMoveRight()) {
            this.pos.x += Grid.convertToPixel(1)
        }
    }

    canMoveRight() {
        var overlap = Grid.getGridOverlap(this.pos.y)
        if (this.game.grid.isEmpty(Grid.getGridLocation(this.pos.x + Grid.convertToPixel(1), this.pos.y))
                && (overlap == .5 || 
                    ((overlap < .5 && this.game.grid.isEmpty(Grid.getGridLocation(this.pos.x + Grid.convertToPixel(1), this.pos.y - Grid.convertToPixel(1))))
                    || (overlap > .5 && this.game.grid.isEmpty(Grid.getGridLocation(this.pos.x + Grid.convertToPixel(1), this.pos.y + Grid.convertToPixel(1))))))) {
            return true
        }
        return false
    }

    moveDown() {
        if (this.canMoveDown()) {
            var speed = 2
            var spaceToGrid = (this.pos.y - Square.offset) % Square.size

            if (spaceToGrid > 0 && spaceToGrid < speed) {
                speed = spaceToGrid
            }

            this.pos.y += speed
        }
    }

    canMoveDown() {
        if (Grid.getGridOverlap(this.pos.y) != .5
                || this.game.grid.isEmpty(Grid.getGridLocation(this.pos.x, this.pos.y + Grid.convertToPixel(1)))) {
            return true
        }
        return false
    }

    addToGrid() {
        this.game.grid.addSquare(this, Grid.getGridLocation(this.pos.x, this.pos.y))
    }

    moveToGrid(location: Coordinate) {
        this.pos.x = Grid.convertToPixel(location.x) + Square.offset
        this.pos.y = Grid.convertToPixel(location.y) + Square.offset
    }

    moveToPixel(pixelX: number, pixelY: number) {
        this.pos.x = pixelX
        this.pos.y = pixelY
    }

}

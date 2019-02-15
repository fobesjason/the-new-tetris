import { Actor, CollisionType, Color } from 'excalibur'
import { Coordinate } from './coordinate'
import { Grid } from '../grid'
import { Jar } from '../jar'

export class Square extends Actor {

    static size = 20.0
    static offset = Square.size / 2

    private grid: Grid

    constructor(jar: Jar, position: Coordinate, color: Color, shadow?: Boolean) {
        super({
            x: Grid.convertToPixel(position.x) + Square.offset,
            y: Grid.convertToPixel(position.y) + Square.offset,
            width: Square.size,
            height: Square.size,
            color: color,
            collisionType: CollisionType.PreventCollision,
            opacity: shadow ? .25 : 1
        })

        this.grid = jar.grid
        jar.add(this)
    }

    moveLeft() {
        this.moveToPixel(this.pos.x - Grid.convertToPixel(1), this.pos.y)
    }

    canMoveLeft() {
        return this.canMoveToPixel(this.pos.x - Grid.convertToPixel(1), this.pos.y)
    }

    moveRight() {
        this.moveToPixel(this.pos.x + Grid.convertToPixel(1), this.pos.y)
    }

    canMoveRight() {
        return this.canMoveToPixel(this.pos.x + Grid.convertToPixel(1), this.pos.y)
    }

    moveDown(speed?: number) {
        this.moveToPixel(this.pos.x, this.pos.y + this.calculateSpeed(speed))
    }

    canMoveDown(speed?: number) {
        return this.canMoveToPixel(this.pos.x, this.pos.y + this.calculateSpeed(speed))
    }

    calculateSpeed(speed?: number) {
        var speed = speed || 6
        if (!Grid.getGridLocation(this.pos.x, this.pos.y + Square.offset).equals(Grid.getGridLocation(this.pos.x, this.pos.y  + Square.offset + speed))) {
            var spaceToGrid = Square.size - (this.pos.y + Square.offset) % Square.size

            if (spaceToGrid < speed) {
                speed = spaceToGrid
            }
        }

        return speed
    }

    addToGrid() {
        this.grid.addSquare(this, Grid.getGridLocation(this.pos.x, this.pos.y))
    }

    moveToGrid(location: Coordinate) {
        this.moveToPixel(Grid.convertToPixel(location.x) + Square.offset, Grid.convertToPixel(location.y) + Square.offset)
    }

    moveToPixel(pixelX: number, pixelY: number) {
        if (this.canMoveToPixel(pixelX, pixelY)) {
            this.pos.x = pixelX
            this.pos.y = pixelY
        }
    }

    canMoveToPixel(pixelX: number, pixelY: number) {
        var overlap = Grid.getGridOverlap(pixelY)
        if (this.grid.isEmpty(Grid.getGridLocation(pixelX, pixelY))
                && (overlap == .5 || 
                    ((overlap < .5 && this.grid.isEmpty(Grid.getGridLocation(pixelX, pixelY - Grid.convertToPixel(1))))
                    || (overlap > .5 && this.grid.isEmpty(Grid.getGridLocation(pixelX, pixelY + Grid.convertToPixel(1))))))) {
            return true
        }
        return false
    }

}

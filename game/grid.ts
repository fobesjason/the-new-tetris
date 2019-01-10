import { Actor, CollisionType, Color, Engine } from 'excalibur'
import { Coordinate } from './elements/coordinate'
import { Square } from './elements/square'

export class Grid {

    private gridSize: Coordinate
    private squares: Square[][]

    constructor(engine: Engine, gridSize: Coordinate) {
        //Top border
        engine.add(new Actor({
            x: Grid.convertToPixel(gridSize.x) / 2,
            y: 0,
            width: Grid.convertToPixel(gridSize.x),
            height: 1,
            color: Color.White,
            collisionType: CollisionType.PreventCollision
        }))

        //Left border
        engine.add(new Actor({
            x: 0,
            y: Grid.convertToPixel(gridSize.y) / 2,
            width: 1,
            height: Grid.convertToPixel(gridSize.y),
            color: Color.White,
            collisionType: CollisionType.PreventCollision
        }))

        //Right border
        engine.add(new Actor({
            x: Grid.convertToPixel(gridSize.x) + 1,
            y: Grid.convertToPixel(gridSize.y) / 2,
            width: 1,
            height: Grid.convertToPixel(gridSize.y),
            color: Color.White,
            collisionType: CollisionType.PreventCollision
        }))

        //Bottom border
        engine.add(new Actor({
            x: Grid.convertToPixel(gridSize.x) / 2,
            y: Grid.convertToPixel(gridSize.y) + 1,
            width: Grid.convertToPixel(gridSize.x),
            height: 1,
            color: Color.White,
            collisionType: CollisionType.PreventCollision
        }))

        this.gridSize = gridSize

        this.squares = []
        for (let i = 0; i < gridSize.y; i++) {
            this.squares[i] = []
        }
    }

    addSquare(square: Square, location: Coordinate) {
        this.squares[location.y][location.x] = square
    }

    isEmpty(location: Coordinate) {
        return this.inBounds(location) && !(this.squares[location.y][location.x] instanceof Square)
    }

    inBounds(location: Coordinate) {
        return location.x >= 0 && location.y >= 0 && location.x < this.gridSize.x && location.y < this.gridSize.y
    }

    static getGridLocation(pixelX: number, pixelY: number) {
        return new Coordinate(Grid.convertToGrid(pixelX), Grid.convertToGrid(pixelY))
    }
    
    static getGridOverlap(pixelY: number) {
        return parseFloat(((pixelY / Square.size) % 1).toFixed(5))
    }

    static convertToGrid(pixel: number) {
        return Math.floor(pixel / Square.size)
    }

    static convertToPixel(grid: number) {
        return grid * Square.size
    }

}

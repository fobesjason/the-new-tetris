import { Coordinate } from './elements/coordinate'
import { Square } from './elements/square'

export class Grid {

    gridSize: Coordinate
    private squares: Square[][]

    constructor(gridSize: Coordinate) {
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

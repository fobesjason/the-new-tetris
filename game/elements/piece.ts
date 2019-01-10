import { Coordinate } from './coordinate'
import { Game } from '../game'
import { Grid } from '../grid'
import { Square } from './square'

export class Piece {

    private axis: Square
    private squares: Square[]
    private orientations: Coordinate[][]
    private currentOrientation = 0

    constructor(game: Game, position: Coordinate, orientations: Coordinate[][], color: ex.Color) {
        this.axis = new Square(game, position, color)
        this.squares = [this.axis]
        this.orientations = orientations

        this.orientations[0].forEach(delta => {
            this.squares[this.squares.length] = new Square(game, position.offset(delta), color)
        })
    }

    moveLeft() {
        var canMove = true
        this.squares.forEach(square => {
            canMove = canMove && square.canMoveLeft()
        })

        if (canMove) {
            this.squares.forEach(square => {
                square.moveLeft()
            })
        }
    }

    moveRight() {
        var canMove = true
        this.squares.forEach(square => {
            canMove = canMove && square.canMoveRight()
        })

        if (canMove) {
            this.squares.forEach(square => {
                square.moveRight()
            })
        }
    }
    
    moveDown() {
        var canMove = true
        this.squares.forEach(square => {
            canMove = canMove && square.canMoveDown()
        })

        if (canMove) {
            this.squares.forEach(square => {
                square.moveDown()
            })
        }
    }

    rotateClockwise() {
        if (++this.currentOrientation == this.orientations.length) {
            this.currentOrientation = 0
        }

        var orientation = this.orientations[this.currentOrientation]
        for (let i = 1; i < this.squares.length; i++) {
            this.squares[i].moveToPixel(this.axis.pos.x + Grid.convertToPixel(orientation[i - 1].x),
                this.axis.pos.y + Grid.convertToPixel(orientation[i - 1].y))
        }
    }

    rotateCounterclockwise() {
        if (--this.currentOrientation == -1) {
            this.currentOrientation = this.orientations.length - 1
        }

        var orientation = this.orientations[this.currentOrientation]
        for (let i = this.squares.length - 1; i > 0; i--) {
            this.squares[i].moveToPixel(this.axis.pos.x + Grid.convertToPixel(orientation[i - 1].x),
                this.axis.pos.y + Grid.convertToPixel(orientation[i - 1].y))
        }
    }

    addToGrid() {
        this.squares.forEach(square => {
            square.addToGrid()
        })
    }

}

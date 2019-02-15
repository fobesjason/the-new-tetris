import { Coordinate } from './coordinate'
import { Grid } from '../grid'
import { Jar } from '../jar'
import { Square } from './square'

export class Piece {

    private grid: Grid
    private axis: Square
    private squares: Square[]
    private shadowSquares: Square[]
    private orientations: Coordinate[][]
    private currentOrientation = 0

    constructor(jar: Jar, position: Coordinate, orientations: Coordinate[][], color: ex.Color) {
        this.grid = jar.grid
        this.axis = new Square(jar, position, color)
        this.squares = [this.axis]
        this.orientations = orientations

        var snapPosition = this.calculateSnapPosition()

        this.shadowSquares = [new Square(jar, snapPosition, color, true)]

        this.orientations[0].forEach(delta => {
            this.squares[this.squares.length] = new Square(jar, position.offset(delta), color)
            this.shadowSquares[this.shadowSquares.length] = new Square(jar, snapPosition.offset(delta), color, true)
        })
    }

    addToGrid() {
        this.squares.forEach(square => {
            square.addToGrid()
        })

        this.removeShadow()
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

            this.moveShadow()
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

            this.moveShadow()
        }
    }
    
    moveDown(speed?: number) {
        var canMove = true
        this.squares.forEach(square => {
            canMove = canMove && square.canMoveDown(speed)
        })

        if (canMove) {
            this.squares.forEach(square => {
                square.moveDown(speed)
            })
        }
    }

    snapDown() {
        var snapPosition = this.calculateSnapPosition()

        this.squares[0].moveToGrid(snapPosition)
        for (let i = 1; i < this.squares.length; i++) {
            this.squares[i].moveToGrid(snapPosition.offset(this.orientations[this.currentOrientation][i - 1]))
        }
    }

    rotateClockwise() {
        var trialOrientation = this.currentOrientation + 1
        if (trialOrientation == this.orientations.length) {
            trialOrientation = 0
        }

        var orientation = this.orientations[trialOrientation]

        if (this.canRotatePiece(this.axis.pos.x, this.axis.pos.y, orientation)) {
            this.currentOrientation = trialOrientation

            for (let i = 1; i < this.squares.length; i++) {
                this.squares[i].moveToPixel(this.axis.pos.x + Grid.convertToPixel(orientation[i - 1].x),
                    this.axis.pos.y + Grid.convertToPixel(orientation[i - 1].y))
            }

            this.moveShadow()
        }
    }

    rotateCounterclockwise() {
        var trialOrientation = this.currentOrientation - 1
        if (trialOrientation == -1) {
            trialOrientation = this.orientations.length - 1
        }

        var orientation = this.orientations[trialOrientation]

        if (this.canRotatePiece(this.axis.pos.x, this.axis.pos.y, orientation)) {
            this.currentOrientation = trialOrientation

            for (let i = 1; i < this.squares.length; i++) {
                this.squares[i].moveToPixel(this.axis.pos.x + Grid.convertToPixel(orientation[i - 1].x),
                    this.axis.pos.y + Grid.convertToPixel(orientation[i - 1].y))
            }

            this.moveShadow()
        }
    }

    private canRotatePiece(pixelX: number, pixelY: number, orientation: Coordinate[]) {
        if (this.tryRotatePiece(pixelX, pixelY, orientation)) { //Rotate in place
            //
        } else if (this.tryRotatePiece(pixelX - Grid.convertToPixel(1), pixelY, orientation)) { //Move one left
            this.axis.moveToPixel(pixelX - Grid.convertToPixel(1), pixelY)
        } else if (this.tryRotatePiece(pixelX + Grid.convertToPixel(1), pixelY, orientation)) { //Move one right
            this.axis.moveToPixel(pixelX + Grid.convertToPixel(1), pixelY)
        } else if (this.tryRotatePiece(pixelX, pixelY - ((pixelY + Square.offset) % Square.size), orientation)) { //Move one up
            this.axis.moveToPixel(pixelX, pixelY - ((pixelY + Square.offset) % Square.size))
        } else {
            return false
        }

        return true
    }

    private tryRotatePiece(pixelX: number, pixelY: number, orientation: Coordinate[]) {
        for (let i = 1; i < this.squares.length; i++) {
            if (!this.grid.isEmpty(Grid.getGridLocation(pixelX + Grid.convertToPixel(orientation[i - 1].x),
                    pixelY + Grid.convertToPixel(orientation[i - 1].y)))) {
                return false
            }
        }

        return true
    }

    private moveShadow() {
        var snapPosition = this.calculateSnapPosition()

        this.shadowSquares[0].moveToGrid(snapPosition)
        for (let i = 1; i < this.shadowSquares.length; i++) {
            this.shadowSquares[i].moveToGrid(snapPosition.offset(this.orientations[this.currentOrientation][i - 1]))
        }
    }

    private removeShadow() {
        this.shadowSquares.forEach(square => {
            square.kill()
        })
        this.shadowSquares = null
    }

    private calculateSnapPosition() {
        var snapPosition = new Coordinate(-5, -5)
        for (let i = Grid.convertToGrid(this.axis.pos.y); i < this.grid.gridSize.y; i++) {
            let trialPosition = new Coordinate(Grid.convertToGrid(this.axis.pos.x), i)
            if (this.grid.isEmpty(trialPosition)) {
                var isEmpty = true
                this.orientations[this.currentOrientation].forEach(delta => {
                    isEmpty = isEmpty && this.grid.isEmpty(trialPosition.offset(delta))
                })
                if (isEmpty) {
                    snapPosition = trialPosition
                } else {
                    return snapPosition
                }
            } else {
                return snapPosition
            }
        }
        return snapPosition
    }

}

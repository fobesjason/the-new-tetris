import { Color } from 'excalibur'
import { Coordinate } from './coordinate'
import { Game } from '../game'
import { Piece } from './piece'

export class HookPieceJ extends Piece {

    constructor(game: Game) {
        super(
            game,
            game.startingPosition,
            [
                [new Coordinate(-1, 0), new Coordinate(1, 0), new Coordinate(1, 1)],
                [new Coordinate(0, -1), new Coordinate(0, 1), new Coordinate(-1, 1)],
                [new Coordinate(1, 0), new Coordinate(-1, 0), new Coordinate(-1, -1)],
                [new Coordinate(0, 1), new Coordinate(0, -1), new Coordinate(1, -1)]
            ],
            Color.Violet
        )
    }

}

export class HookPieceL extends Piece {

    constructor(game: Game) {
        super(
            game,
            game.startingPosition,
            [
                [new Coordinate(1, 0), new Coordinate(-1, 0), new Coordinate(-1, 1)],
                [new Coordinate(0, 1), new Coordinate(0, -1), new Coordinate(-1, -1)],
                [new Coordinate(-1, 0), new Coordinate(1, 0), new Coordinate(1, -1)],
                [new Coordinate(0, -1), new Coordinate(0, 1), new Coordinate(1, 1)]
            ],
            Color.Rose
        )
    }

}

export class LightningPieceS extends Piece {

    constructor(game: Game) {
        super(
            game,
            game.startingPosition,
            [
                [new Coordinate(0, -1), new Coordinate(1, -1), new Coordinate(-1, 0)],
                [new Coordinate(1, 0), new Coordinate(1, 1), new Coordinate(0, -1)]
            ],
            Color.Green
        )
    }

}

export class LightningPieceZ extends Piece {

    constructor(game: Game) {
        super(
            game,
            game.startingPosition,
            [
                [new Coordinate(-1, 0), new Coordinate(0, 1), new Coordinate(1, 1)],
                [new Coordinate(0, -1), new Coordinate(-1, 0), new Coordinate(-1, 1)]
            ],
            Color.Red
        )
    }
    
}

export class PyramidPiece extends Piece {

    constructor(game: Game) {
        super(
            game,
            game.startingPosition,
            [
                [new Coordinate(-1, 0), new Coordinate(0, 1), new Coordinate(1, 0)],
                [new Coordinate(0, -1), new Coordinate(-1, 0), new Coordinate(0, 1)],
                [new Coordinate(1, 0), new Coordinate(0, -1), new Coordinate(-1, 0)],
                [new Coordinate(0, 1), new Coordinate(1, 0), new Coordinate(0, -1)]
            ],
            Color.Yellow
        )
    }

}

export class SquarePiece extends Piece {

    constructor(game: Game) {
        super(
            game,
            game.startingPosition,
            [
                [new Coordinate(1, 0), new Coordinate(1, 1), new Coordinate(0, 1)]
            ],
            Color.Gray
        )
    }

}

export class StraightPiece extends Piece {

    constructor(game: Game) {
        super(
            game,
            game.startingPosition,
            [
                [new Coordinate(1, 0), new Coordinate(2, 0), new Coordinate(-1, 0)],
                [new Coordinate(0, 1), new Coordinate(0, 2), new Coordinate(0, -1)]
            ],
            Color.Blue
        )
    }

}

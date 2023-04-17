/**
 * Set up the game and makes the link between the API and the algorithm
 */

const algorithm = require("./algorithm");

/**
 * Convert the string board into an array
 * -'m' -> 1
 * -'h' -> -0
 * -'0' -> 0
 * @param stringBoard
 */
function boardConverter(stringBoard){
    // The board used by our algorithm to compute the best move to play
    let board = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if(stringBoard[j*6+i] === 'm')
                board[j][i] = 1;
            else if (stringBoard[j*6+i] === 'h')
                board[j][i] = -1;
        }
    }
    return board;
}

/**
 * Call the algorithm to get the best move
 * @param stringBoard as a string
 * @returns {Promise<unknown>} the column to play in
 */
async function play(stringBoard) {
    let board = boardConverter(stringBoard);
    return algorithm.getBestColumnToPlayIn(board);
}

exports.boardConverter = boardConverter;
exports.play = play;

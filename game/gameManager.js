const algorithm = require("./algorithm");

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

/**
 * Convert the string board into an array
 * -'m' -> 1
 * -'h' -> -0
 * -'0' -> 0
 * @param stringBoard
 */
function boardConverter(stringBoard){
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
            if(stringBoard[i*7+j] === 'm')
                board = 1;
            else if (stringBoard[i*7+j] === 'h')
                board = -1;
        }
    }
}

/**
 * Call the algorithm to get the best move
 * @param board as an array
 * @returns {Promise<unknown>} the column to play in
 */
async function play(board) {
    return algorithm.getColumn(board);
}

exports.play = play;

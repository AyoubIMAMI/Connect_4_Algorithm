/**
 * Manage the input.
 * Here, the board format is a string containing 42 characters which can only b 'm', 'h', and '0'
 */

const gameManager = require("../game/gameManager");
const gameController = require("../game/gameController");

/**
 * Verify if the board format is valid:
 * - Not null
 * - 42 characters
 * - Only contains 'm', 'h', and '0'
 * @param board
 * @returns {boolean}
 */
function isBoardValid(board) {
    return board !== null && board.length === 42 && /^[mh0]+$/.test(board);
}

/**
 * Verify if the tokens are well staked or if some are floating in the air
 * @param board
 * @returns {boolean}
 */
function isBoardLegal(board) {
    const ROWS = 6;
    const EMPTY = '0';

    for(let i = 0; i < board.length; i++)
        if(i % ROWS !== 0 && board[i] !== EMPTY && board[i - 1] === EMPTY)
            return false;
    return true;
}

/**
 * Count how many times the machine and the player played
 * As the human is the first player:
 * - difference = 0: human's turn to play
 * - difference = 1: AI's turn to play
 * - difference < 0 or > 1: error message: a player has played twice
 * @param board
 * @returns {number}
 */
function moveCounter(board){
    let difference = 0;
    for (let i = 0; i < board.length; i++) {
        if(board[i] === 'h') difference++;
        else if (board[i] === 'm') difference--;
    }
    return difference;
}

/**
 * Verify if there is board is already on a finished configuration: draw or a winner
 * @param board as a string
 * @returns {boolean} true if the game is finished
 */
function isGameFinished(board) {
    const arrayBoard = gameController.boardConverter(board);
    return gameManager.isTie(arrayBoard) // Verify if there is a draw
        || gameManager.isThereAWinner(arrayBoard, -1) // Verify if the human won
        || gameManager.isThereAWinner(arrayBoard, 1); // Verify if the AI won
}

exports.isBoardValid = isBoardValid;
exports.isBoardLegal = isBoardLegal;
exports.moveCounter = moveCounter;
exports.isGameFinished = isGameFinished;

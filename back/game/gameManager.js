/**
 * All functions needed to handle the board, the moves and the game
 */

/**
 * Returns an array of legal moves on the board.
 * @param board as an array
 * @returns {*[]} array of legal moves, it might be empty if there are no legal moves
 */
function getLegalMoves(board) {
    let legalMovesToFind = [];
    for (let col = 0; col < 7; col++) {
        if (board[col][5] === 0) {
            legalMovesToFind.push(col);
        }
    }
    return legalMovesToFind;
}

/**
 * Returns a random legal move on the board.
 * @param board as an array
 * @returns {*} the index of the column
 */
function getRandomMove(board) {
    legalMovesToGet = getLegalMoves(board);
    return legalMovesToGet[Math.floor(Math.random() * legalMovesToGet.length)];
}

/**
 * Find the lowest empty row of a column according to the board
 * @param board as an array
 * @param column column in which the row is needed to be found
 * @returns {number} row index
 */
function findRow(board, column) {
    let rowToFind = 5;
    while(board[column][rowToFind] === 0 && rowToFind > 0) {
        rowToFind--;
    }
    if(rowToFind === 0 && board[column][rowToFind] === 0){
        return rowToFind;
    }
    return rowToFind + 1;
}

/**
 * Returns true if the board is full and there is no winner, false otherwise.
 * @param board as an array
 * @returns {boolean} boolean
 */
function isTie(board) {
    for (let col = 0; col < 7; col++) {
        if (board[col][5] === 0) {
            return false;
        }
    }
    return true;
}

/**
 * Check if there is a winner according to the last move
 * @param board as an array
 * @param line line of the last move
 * @param column column of the last move
 * @returns {boolean} boolean
 */
function isWin(board, line,column) {
    const player = board[column][line];
    let count = 1;
    let j = line;
    while (j > 0 && board[column][j - 1] === player) {
        j--;
        count++;
    }
    j = line;
    while (j < board[column].length - 1 && board[column][j + 1] === player) {
        j++;
        count++;
    }
    if (count >= 4) {
        return true;
    }

    // Check horizontal
    count = 1;
    let i = column;
    while (i > 0 && board[i - 1][line] === player) {
        i--;
        count++;
    }
    i = column;
    while (i < board.length - 1 && board[i + 1][line] === player) {
        i++;
        count++;
    }
    if (count >= 4) {
        return true;
    }

    // Check diagonal (top-left to bottom-right)

    count = 1;
    i = column;
    j = line;
    while (i > 0 && j > 0 && board[i - 1][j - 1] === player) {
        i--;
        j--;
        count++;
    }
    i = column;
    j = line;
    while (i < board.length - 1 && j < board[column].length - 1 && board[i + 1][j + 1] === player) {
        i++;
        j++;
        count++;
    }
    if (count >= 4) {
        return true;
    }

    // Check diagonal (bottom-left to top-right)
    count = 1;
    i = column;
    j = line;
    while (i > 0 && j < board[column].length - 1 && board[i - 1][j + 1] === player) {
        i--;
        j++;
        count++;
    }
    i = column;
    j = line;
    while (i < board.length - 1 && j > 0 && board[i + 1][j - 1] === player) {
        i++;
        j--;
        count++;
    }

    return count >= 4;
}

exports.getLegalMoves = getLegalMoves;
exports.getRandomMove = getRandomMove;
exports.findRow = findRow;
exports.isTie = isTie;
exports.isWin = isWin;



function isBoardValid(board) {
    return board != null && board.length === 42 && /^[mh0]+$/.test(board);
}

function isBoardLegal(board) {
    const ROWS = 6;
    const EMPTY = '0';

    for(let i = 0; i < board.length; i++)
        if(i % ROWS !== 0 && board[i] !== EMPTY && board[i - 1] === EMPTY)
            return false;

    return true;
}

function moveCounter(board){
    let difference = 0;
    for (let i = 0; i < board.length; i++) {
        if(board[i] === 'm') difference--;
        else if (board[i] === 'h') difference++;
    }
    return difference;
}

exports.isBoardValid = isBoardValid;
exports.isBoardLegal = isBoardLegal;
exports.moveCounter = moveCounter;

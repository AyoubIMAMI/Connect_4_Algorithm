const gameVerification = require("./gameVerification");

// An array used to choose the best column depending on its win rate
let moveWinsInMC;

/**
 * Get the best column to play in
 * @param board as an array
 * @returns {Promise<*>} an int which represents the column index
 */
function getBestColumnToPlayIn(board) {
    moveWinsInMC = Array(7).fill(0);
    let start = performance.now();
    return monteCarlo(board, 1, start,2000);
}

/**
 * Returns a new board with the player's move made in the specified column.
 * @param board as an array
 * @param player who has to play, 1 for the AI and -1 for the human
 * @param column in which the move is made
 * @returns {*|null} the new board or null if the column is full
 */
function makeMove(board, player, column) {
    let newBoardAfterMove = board.map(col => col.slice()); // Copy the board
    for (let row = 0; row < 6; row++) {
        if (newBoardAfterMove[column][row] === 0) {
            newBoardAfterMove[column][row] = player;
            return newBoardAfterMove;
        }
    }
    return null; // Column is full
}

/**
 * Simulates a game on the board starting with the given player.
 * @param board as an array
 * @param player who has to play, 1 for the AI and -1 for the human
 * @returns {number|number} modification of the current player, 1 or -1
 */
function simulateGame(board, player) {
    let currPlayerSim = player;
    while (true) {
        let moveSim = gameVerification.getRandomMove(board);
        board = makeMove(board, currPlayerSim, moveSim);
        if (gameVerification.isWin(board, gameVerification.findRow(board,moveSim)-1, moveSim)) {
            return currPlayerSim;
        }
        if (gameVerification.isTie(board)) {
            return 0;
        }
        currPlayerSim = currPlayerSim === 1 ? -1 : 1;
    }
}

/**
 * Runs the Monte Carlo algorithm on the board for the given player.
 * Simulates as many games as possible in 2000ms and returns the best move based on the simulation results.
 * @param board as an array
 * @param player 1 for the AI and -1 for the human. Always 1 here
 * @param start time at which the algorithm is run
 * @param time 2000 ms
 * @returns {Promise<unknown>} The best column to play in
 */
function monteCarlo(board, player, start,time) {
    return new Promise(function(resolve, reject) {
        let legalMovesInMC = gameVerification.getLegalMoves(board);
        let simulationsInMC = 0;
        let finalMove;
        let notFinished=true;
        let counter = 0;
        let iteration=0;
        let timer = performance.now();
        while (notFinished) {
            while (performance.now() - timer <= time/10){

                for (const move of legalMovesInMC) {
                    iteration++;
                    const newBoard = makeMove(board, player, move);
                    let result;
                    if (gameVerification.isWin(newBoard, gameVerification.findRow(newBoard, move) - 1, move)) {
                        result = 1;
                        counter++;
                    }
                    else if (gameVerification.isTie(newBoard)) {
                        result = 0.5;
                    }
                    else {
                        result = simulateGame(newBoard, -1);
                    }
                    moveWinsInMC[move] += result === player ? 1 : result === 0 ? 0.5 : 0;
                    simulationsInMC++;
                    if (performance.now() - start >= time) {
                        let c = moveWinsInMC.indexOf(Math.max(...moveWinsInMC));
                        if(Math.max(...moveWinsInMC) === 0){
                            c = legalMovesInMC[0];
                        }
                        let r = gameVerification.findRow(board,c);
                        board[c][r] = 1;
                        finalMove=[c, r];
                        notFinished=false;
                        break;
                    } // stop if time limit reached
                }
                if (performance.now() - start >= time) break;
            }
            if (performance.now() - start >= time) break;
            console.log(performance.now() - timer);
            let currentMax = Math.max(...moveWinsInMC);
            let threshold = 0.8+ (Math.min(0.99,((performance.now() - start)/time))*0.2); // Set the threshold to 20%
            console.log("threshold")
            console.log(threshold)
            let newLegalMovesInMC = legalMovesInMC.filter(index=> moveWinsInMC[index] >= currentMax * threshold);
            if (newLegalMovesInMC.length>1) legalMovesInMC=newLegalMovesInMC;
            console.log("probabilities");
            console.log(moveWinsInMC);
            console.log("future all moves:");
            console.log(legalMovesInMC);
            timer=performance.now();
        }
        setTimeout(resolve,0,finalMove[0] + 1);
    });
}

exports.getBestColumnToPlayIn = getBestColumnToPlayIn;

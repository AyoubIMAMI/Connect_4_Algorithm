let counter = 0;
let gameOver = false;
const mapColor = new Map();
let littleCount=0;
let botSmartVictories=0;
let botRandomVictories=0;
let draw=0;
let botSmartWinsDisplay;
let botRandomWinsDisplay;
let drawsDisplay;
mapColor.set('Yellow','#cee86bcc');
mapColor.set('Red','#c92c2c9c');
document.addEventListener('DOMContentLoaded', init);
/**
 * This class manage the local game
 *
 */

window.addEventListener('load', async function () {
        colorMessage(counter);

    }
)

async function init() {

    window.addEventListener("load", function () {
        colorMessage(counter);
    })
    botSmartWinsDisplay=document.getElementById("botSmart-wins");
    botRandomWinsDisplay=document.getElementById("botRandom-wins");
    drawsDisplay=document.getElementById("draws");

    document.getElementById("grid").addEventListener("click", function () {
        if (!gameOver) colorMessage(counter);
    });
    play();

}

async function play() {
    while(true){
        if (gameOver ) break
        let firstTab= toTab();
        let tab = [getRandomMove(firstTab)];
        gameOver = !startPlay(tab);
        counter++;
        if (gameOver) break
        colorMessage(counter);
        await new Promise(r => setTimeout(r, 50));
        let move = await getBestColumnToPlayIn(toTab());
        gameOver = !startPlay(move);
        counter++;
        if (!gameOver)  colorMessage(counter);
    }
    resetGame();
}

/**
 * return false if the game is finished and true is the person still plays
 * @param tab
 * @returns {boolean|void}
 */
function startPlay(tab) {
    removeIllegalMove();
    let color = 'red';
    if (counter % 2 === 0) color = 'yellow';

    let column = tab[0];
    let line = 5;

    let id = column + " " + line;



    while (line >=0 && document.getElementById(id).style.backgroundColor === "") {
        line--;
        id = column + " " + line;
    }

    line++;
    id = column + " " + line;
    document.getElementById(id).style.backgroundColor = color;
    if (counter === 41) {
        draw+=1;
        drawsDisplay.textContent=draw;
        document.getElementById("message").innerText = "Draw!";
        document.getElementById("reset-button").style.display = "block";
        document.getElementById("reset-button").addEventListener("click", resetGame);
        return false;
    }
    if (checkWin() === true) {
        if (color==="red")
        {
            botSmartVictories+=1;
            botSmartWinsDisplay.textContent=botSmartVictories;
        }
        else
        {
            botRandomVictories+=1
            botRandomWinsDisplay.textContent=botRandomVictories;
        }
        document.getElementById("message").innerText = color + " player wins!";
        document.getElementById("reset-button").style.display = "block";
        document.getElementById("reset-button").addEventListener("click", resetGame);
        return false;
    }


    return true;
}

/**
 * play again when the game is finished
 */

function resetGame() {
    gameOver = false;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            let id = j + " " + i;
            document.getElementById(id).style.backgroundColor = "";
        }
    }
    counter = 0;
    document.getElementById("message").innerText = "";
    document.getElementById("reset-button").style.display = "none";
    play();
}


function colorMessage(counter) {
    let color = 'Red';
    if (counter % 2 === 0) color = 'Yellow';
    document.getElementById("body").style.backgroundColor = mapColor.get(color);
    document.getElementById("player").innerText = color + " turn to play";
}

function checkWin() {
    let winner = false;
    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 7; i++) {
            let color = document.getElementById(i + " " + j).style.backgroundColor;
            if (color !== "") {
                if (checkVertical(i, j, color) || checkHorizontal(i, j, color) || checkDiagonal(i, j, color)) {
                    winner = true;
                    break;
                }
            }
        }
        if (winner) {
            break;
        }
    }
    return winner;}

function removeIllegalMove() {
    document.getElementById("message").innerText = "";
}
function isMoveIllegal(event){
    let id = event.target.id;
    let tab = id.split(" ");
    let column = tab[0];
    let line = 5;

    id = column + " " + line;
    if (document.getElementById(id).style.backgroundColor !== "") {
        printIllegalMove();
        return true;
    }
    return false;
}
function printIllegalMove() {
    document.getElementById("message").innerText = "Illegal move!";
}

function checkVertical(i, j) {
    let color = document.getElementById(i + " " + j).style.backgroundColor;
    let count = 0;
    for (let k = 0; k < 4; k++) {
        let id = (i + k) + " " + j;
        if (document.getElementById(id) && document.getElementById(id).style.backgroundColor === color) {
            count++;
        } else break;
    }
    return count === 4;
}

function checkHorizontal(i, j) {
    let color = document.getElementById(i + " " + j).style.backgroundColor;
    let count = 0;
    for (let k = 0; k < 4; k++) {
        let id = i + " " + (j + k);
        if (document.getElementById(id) && document.getElementById(id).style.backgroundColor === color) {
            count++;
        } else break;
    }
    return count === 4;
}

function checkDiagonal(i, j) {
    let color = document.getElementById(i + " " + j).style.backgroundColor;
    let count = 0;
    for (let k = 0; k < 4; k++) {
        let id = (i + k) + " " + (j + k);
        if (document.getElementById(id) && document.getElementById(id).style.backgroundColor === color) {
            count++;
        } else break;
    }
    if (count === 4) return true;

    count = 0;
    for (let k = 0; k < 4; k++) {
        let id = (i - k) + " " + (j + k);
        if (document.getElementById(id) && document.getElementById(id).style.backgroundColor === color) {
            count++;
        } else break;
    }
    if (count === 4) return true;
    return false;
}


//======================================================================================================= IA Part


let start;
let legalMovesToFind;
let legalMovesToGet;
let currPlayerSim;
let moveSim;
let rowToFind;
let legalMovesInMC;
let moveWinsInMC;
let simulationsInMC;
let newBoardAfterMove;

function getBestColumnToPlayIn(board) {
    moveWinsInMC = Array(7).fill(0);
    start = performance.now();
    return monteCarlo(board, 1, start,100);
}

function getLegalMoves(board) {
    /**
     * Returns an array of legal moves on the board.
     */
    legalMovesToFind = [];
    for (let col = 0; col < 7; col++) {
        if (board[col][5] === 0) {
            legalMovesToFind.push(col);
        }
    }
    return legalMovesToFind;
}

function getRandomMove(board) {
    /**
     * Returns a random legal move on the board.
     */
    legalMovesToGet = getLegalMoves(board);
    return legalMovesToGet[Math.floor(Math.random() * legalMovesToGet.length)];
}

function simulateGame(board, player) {
    /**
     * Simulates a game on the board starting with the given player.
     */
    currPlayerSim = player;
    while (true) {
        moveSim = getRandomMove(board);
        board = makeMove(board, currPlayerSim, moveSim);
        if (isWin(board, findRaw(board,moveSim)-1, moveSim)) {
            return currPlayerSim;
        }
        if (isTie(board)) {
            return 0;
        }
        currPlayerSim = currPlayerSim === 1 ? -1 : 1;
    }
}

function findRaw(board, column) {
    rowToFind = 5;
    while(board[column][rowToFind] === 0 && rowToFind > 0) {
        rowToFind--;
    }
    if(rowToFind === 0 && board[column][rowToFind] === 0){
        return rowToFind;
    }
    return rowToFind + 1;

}

function monteCarlo(board, player, start,time) {
    return new Promise(function(resolve, reject) {
        /**
         * Runs the Monte Carlo algorithm on the board for the given player.
         * Simulates as many games as possible in 100ms and returns the best move based on the simulation results.
         */
        legalMovesInMC = getLegalMoves(board);
        simulationsInMC = 0;
        let finalMove;
        let notFinished=true;
        let counter = 0;
        let iteration=0;
        let timer = performance.now();
        while (notFinished) {
            while (performance.now() - timer <= time/10 && notFinished){

                for (const move of legalMovesInMC) {
                    iteration++;
                    const newBoard = makeMove(board, player, move);
                    let result;
                    if (isWin(newBoard, findRaw(newBoard, move) - 1, move)) {
                        result = 1;
                        counter++;
                    }
                    else if (isTie(newBoard)) {
                        result = 0.5;
                    }
                    else {
                        result = simulateGame(newBoard, -1);
                    }
                    moveWinsInMC[move] += result === player ? 1 : result === 0 ? 0.5 : 0;
                    simulationsInMC++;
                    if (performance.now() - start >= time) break;
                }
                if (performance.now() - start >= time)
                {
                    notFinished=false;
                    break;
                }
            }
            let currentMax = Math.max(...moveWinsInMC);
            let threshold = 0.8+ (Math.min(1,((performance.now() - start)/time))*0.2); // Set the threshold to 20%
            let newlegalMovesInMC = legalMovesInMC.filter(index=> moveWinsInMC[index] >= currentMax * threshold);
            if (newlegalMovesInMC.length>1) legalMovesInMC=newlegalMovesInMC;

            timer=performance.now();
        }
        let c = moveWinsInMC.indexOf(Math.max(...moveWinsInMC));
        if(Math.max(...moveWinsInMC) === 0){
            c = legalMovesInMC[0];
        }
        let r = findRaw(board,c);
        finalMove=[c, r];
        setTimeout(resolve,0,finalMove);
    });
}

function makeMove(board, player, column) {
    /**
     * Returns a new board with the player's move made in the specified column.
     */
    newBoardAfterMove = board.map(col => col.slice()); // Copy the board
    for (let row = 0; row < 6; row++) {
        if (newBoardAfterMove[column][row] === 0) {
            newBoardAfterMove[column][row] = player;
            return newBoardAfterMove;
        }
    }
    return null; // Column is full
}

function isTie(board) {
    /**
     * Returns true if the board is full and there is no winner, false otherwise.
     */
    for (let col = 0; col < 7; col++) {
        if (board[col][5] === 0) {
            return false;
        }
    }
    return true;
}

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


function toTab(){
    let l = [];
    for (let j = 0; j < 7; j++) {
        l[j]=[];
        for (let i = 0; i < 6; i++) {
            let id = j + " " + i;
            switch (document.getElementById(id).style.backgroundColor){
                case(""):
                    l[j][i]=0;
                    break;
                case("red"):
                    l[j][i]=1;
                    break;
                case("yellow"):
                    l[j][i]=-1;
                    break;
            }
        }
    }
    return l;
}


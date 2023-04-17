const express = require('express');
const gameManager = require("./game/gameManager");
const inputManager = require("./input/inputManager");

const app = express();

/**
 * Manage the API request
 * Get the board, compute the move and send a response
 */
app.get('/move', async (request, response) => {
    // Get the board
    const board = request.query['b'];

    // Verify the board format
    if (!inputManager.isBoardValid(board))
        return response.status(400).send("Invalid board format");

    // Verify the board consistency
    if(!inputManager.isBoardLegal(board))
        return response.status(400).send("Illegal board: token floating in the air");

    // Verify if it is the AI turn to play and if the human played twice
    let moveDifference = inputManager.moveCounter(board);
    if(moveDifference === 0) response.status(422).json({detail: "Not the AI turn to play"});
    else if(moveDifference !== 1) return response.status(400).send("Illegal board");


        // Get the move: the column
        console.log("TESTTTT")
        let column = await gameManager.play(board);
        console.log("the column");
        console.log(column);
        response.status(200).json({column: column});
});

// Starting the server
app.listen(3000, () => {
    console.log('--- Server is listening on port 3000 ---');
});

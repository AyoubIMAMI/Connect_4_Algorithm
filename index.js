const express = require('express');
const gameManager = require("./game/gameManager");
const inputManager = require("./input/inputManager");

const app = express();

app.get('/move', async (request, response) => {
    const board = request.query['b'];

    if (!inputManager.isBoardValid(board))
        return response.status(400).send("Invalid board format");

    if(!inputManager.isBoardLegal(board))
        return response.status(400).send("Illegal board: token floating in the air");

    let moveDifference = inputManager.moveCounter(board);
    if(moveDifference === 0) response.status(422).json({detail: "Not the turn of the AI."});
    else if(moveDifference > 1 || moveDifference < 0) return response.status(400).send("Illegal board");

    try {
        let column = await gameManager.play(board);
        response.status(200).json({column: column});
    } catch (e) {
        response.status(422).json({detail: e.message});
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});

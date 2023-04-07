const express = require('express');
const gameManager = require("./game/gameManager");
const inputManager = require("./input/inputManager");

const app = express();

app.get('/move', async (request, response) => {
    const board = request.query['b'];

    if (!inputManager.isBoardValid(board))
        return response.status(400).send("Invalid Format");

    if(!inputManager.isBoardLegal(board))
        return response.status(400).send("Illegal board");

    let moveDifference = inputManager.moveCounter(board);
    if(moveDifference === 0) response.status(422).json({detail: "Not the turn of the AI."});
    if(moveDifference > 1 || moveDifference < 0) return response.status(400).send("Illegal board");


});

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});

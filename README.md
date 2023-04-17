# Connect4

This is a nodeJS REST-API application to play to the Connect4 game. The used algorithm is derived from Monte Carlo.

### Authors
- [Mourad KARRAKCHOU](https://github.com/MouradKarrakchou)
- [Ayoub IMAMI](https://github.com/AyoubIMAMI)


### Play against the AI
[Here](https://ayoubimami.github.io/connect4/tryOn/botGame.html) you can find a simple html page allowing you to play against our AI.<br>
The AI has 2 seconds to play.

# How to run the project
You can run the project using one of these technologies:
- [NodeJS](https://nodejs.org/en)
- [Docker](https://www.docker.com/)

### Run the project using the image from DockerHub
```
docker run -d --name Connect4 -p 3000:3000 youbima/connect4:v1.0
```

### Run the project using Docker

- Go to the **back** folder after cloning th project
```sh
cd back
```

- Build and Run the docker image by executing the start.sh file
```sh
./start.sh
```

### Run the project using NodeJS
- Go to the **back** folder after cloning the project
```sh
cd back
```
- Install npm dependencies
```sh
npm install
```

- Start node project
```sh
npm start
```

## Scripts
- ``build.sh`` only build the image
- ``start.sh`` build the image and run it in a container 

# Api Documentation
## /GET /move?b=<board-content>
### Query syntax
The query argument `b` provides the current contents of the game board, using the following conventions:
- String of 42 characters
- The string should be built by scanning in column, starting from the bottom left corner
- Each character must be one of these:

| Character | Representation       |
|-----------|----------------------|
| 0 (zero)  | Empty cell           |
| h         | Human player's token |
| m         | AI's token           |

For instance, the string `m00000h00000mm0000hmh000h00000h00000000000` represents the following board:
```
. . . . . . .
. . . . . . .
. . . . . . .
. . . h . . .
. . m m . . .
m h m h h h .
```
### Return code
| Return Code | Type | Data              | Description                                                                                                                                                                                                         |
|-------------|------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 200 (OK)    | JSON | {column: int}     | `Column` contains an integer representing the number of the column to be played. **Column indexes: from 1 to 7**                                                                                                    |
| 400         | Text | Error message     | `Invalid board format`: it must be not null, contains 42 characters and only contains 'm', 'h', and '0' <br> `Illegal board`: token floating in the air <br> `Illegal board`: the player or the AI has played twice |
| 422         | JSON | {detail: string}  | `Turn`: Not the AI turn to play <br> `Party over`: the party is over                                                                                                                                                |


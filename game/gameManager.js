let board;


function traduction(boardString){
    board= [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
            if(boardString[i*7+j]==='m')
                board=1
            else if (boardString[i*7+j]==='h')
                board=-1
        }
    }
}

export async function play(board) {

}

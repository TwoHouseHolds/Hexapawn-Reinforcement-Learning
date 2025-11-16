let consideredBlackMoves = [];
const losingBlackMovesWBoard = [];
let chosenBlackMove = [];
let lastBlackMoveWBoard = [];

// random selection
auswahlButton.addEventListener('click', () => {
    if(roundFinished || whitesTurn) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * consideredBlackMoves.length);
    chosenBlackMove = consideredBlackMoves[randomIndex];
    const boardCopy = JSON.parse(JSON.stringify(board));
    lastBlackMoveWBoard = [boardCopy, chosenBlackMove];
    selectionCircle.style.color = colors[randomIndex];

    auswahlButton.disabled = true;
    durchfuehrenButton.disabled = false;
});

// make move
durchfuehrenButton.addEventListener('click', () => {
    if(roundFinished || whitesTurn) {
        return;
    }

    makeMove(chosenBlackMove[0], chosenBlackMove[1], chosenBlackMove[2], chosenBlackMove[3]);

    lines.innerHTML = '';
    selectionCircle.style.color = 'white';

    durchfuehrenButton.disabled = true;
    whitesTurn = true;
    document.body.classList.add('white-can-move');
});

function prepareBlackMove() {
    consideredBlackMoves = allLegalMoves(false);
    for(let i = 0; i < losingBlackMovesWBoard.length; i++) {
        const losingBoardPostion = losingBlackMovesWBoard[i][0];
        if(arrays2DEqual(board, losingBoardPostion)) {
            const losingMove = losingBlackMovesWBoard[i][1];
            consideredBlackMoves = consideredBlackMoves.filter(move => 
                JSON.stringify(move) !== JSON.stringify(losingMove)
            );
        }
    }

    // AI ran out of moves
    if(consideredBlackMoves.length == 0) {
        roundFinished = true;
        losingBlackMovesWBoard.push(lastBlackMoveWBoard);
        notification.innerHTML = "AI has run out of non-losing moves.<br>White wins!<br>The last black move has been removed.";
        notification.style.visibility = 'visible';
        restart.style.visibility = 'visible';
    }

    drawMoveLines(consideredBlackMoves);
}

function drawMoveLines(moves) {
    let linesContent = '';
    moves.forEach((move, index) => {
        linesContent += '<line class="arrow-line" ' + 
                        'x1="' + (50 + 100*move[1]) + '" ' + 
                        'y1="' + (250 - 100*move[0]) + '" ' +
                        'x2="' + (50 + 100*move[3]) + '" ' +
                        'y2="' + (250 - 100*move[2]) + '" ' +
                        'style="stroke: ' + colors[index] + ';"/>'
    });
    lines.innerHTML = linesContent;
}
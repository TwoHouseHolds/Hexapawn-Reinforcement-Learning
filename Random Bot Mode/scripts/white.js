let consideredWhiteMoves = [];
let chosenWhiteMove = [];

async function doWhiteMove() {
    if(roundFinished || blacksTurn) {
        return;
    }
    await new Promise(r => setTimeout(r, 1000)); // Thread.sleep(1s)
    consideredWhiteMoves = allLegalMoves(true);
    const randomIndex = Math.floor(Math.random() * consideredWhiteMoves.length);
    chosenWhiteMove = consideredWhiteMoves[randomIndex];
    makeMove(chosenWhiteMove[0], chosenWhiteMove[1], chosenWhiteMove[2], chosenWhiteMove[3]);
    blacksTurn = true;
    document.body.classList.add('blacks-turn');
}

doWhiteMove();
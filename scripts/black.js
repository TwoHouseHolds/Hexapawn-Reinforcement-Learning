let consideredMoves = [];
let chosenMove = [];

// random selection
auswahlButton.addEventListener('click', () => {
    if(roundFinished || whitesTurn) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * consideredMoves.length);
    chosenMove = consideredMoves[randomIndex];
    selectionCircle.style.color = colors[randomIndex];

    auswahlButton.disabled = true;
    durchfuehrenButton.disabled = false;
});

// make move
durchfuehrenButton.addEventListener('click', () => {
    if(roundFinished || whitesTurn) {
        return;
    }

    makeMove(chosenMove[0], chosenMove[1], chosenMove[2], chosenMove[3]);

    lines.innerHTML = '';
    selectionCircle.style.color = 'white';

    durchfuehrenButton.disabled = true;
    whitesTurn = true;
    document.body.classList.add('white-can-move');
});
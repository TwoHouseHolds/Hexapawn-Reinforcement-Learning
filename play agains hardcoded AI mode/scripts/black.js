const squares = document.querySelectorAll('.square');
let startSquare = null;

function initBlack() {
    // pieces: dragged
    const draggablePieces = document.querySelectorAll('.piece-black');
    draggablePieces.forEach(piece => {
        // start
        piece.addEventListener('dragstart', (e) => {
            if(roundFinished || !blacksTurn) {
                e.preventDefault(); // stops drag from starting
                return;
            }
            
            startSquare = piece.parentElement;
            // fade out old position
            setTimeout(() => piece.style.opacity = '0.5', 0);
        });

        // end
        piece.addEventListener('dragend', () => {
            startSquare = null;
            // fade in new posiotion
            piece.style.opacity = '1';
        });
    });
}

initBlack();

// squares: dropped
squares.forEach(square => {
    square.addEventListener('dragover', (e) => e.preventDefault()); // allow drop

    // drop/move
    square.addEventListener('drop', (e) => {
        if(roundFinished || !blacksTurn) return;

        e.preventDefault();
        const targetSquare = e.target.closest('.square');// only drop onto squares

        const startRow = parseInt(startSquare.id) - 1; // 1a -> 1 -> 0
        const startCol = startSquare.id.charCodeAt(1) - 97; // 1a -> a -> 0
        const targetRow = parseInt(targetSquare.id) - 1;
        const targetCol = targetSquare.id.charCodeAt(1) - 97;
        
        if(isLegalMove(startRow, startCol, targetRow, targetCol)) {
            makeMove(startRow, startCol, targetRow, targetCol);
            
            if(!roundFinished) {
                blacksTurn = false;
                document.body.classList.remove('blacks-turn');
                doWhiteMove();         
            }
        }
    });
});
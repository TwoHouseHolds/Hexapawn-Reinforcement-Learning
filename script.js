const draggablePieces = document.querySelectorAll('.piece-white');
const squares = document.querySelectorAll('.square');

let whiteCanMove = true;
let draggedPiece = null;
let startSquare = null;
const auswahlButton = document.getElementById('auswahlButton');
const selection = document.getElementById('selection');
const durchfuehrenButton = document.getElementById('durchfuehrenButton');
const lines = document.getElementById('lines');
const board = [
    [1, 1, 1],
    [0, 0, 0],
    [2, 2, 2]
]; // THE VISUAL REPRESENTATION IS MIRRORED HORIZONTALLY


// pieces: dragged
draggablePieces.forEach(piece => {
    // start
    piece.addEventListener('dragstart', (e) => {
        if(!whiteCanMove) {
            e.preventDefault(); // stops drag from starting
            return;
        }
        
        draggedPiece = piece;
        startSquare = piece.parentElement;
        // fade out old position
        setTimeout(() => piece.style.opacity = '0.5', 0);
    });

    // end
    piece.addEventListener('dragend', () => {
        draggedPiece = null;
        startSquare = null;
        // fade in new posiotion
        piece.style.opacity = '1';
    });
});

// squares: dropped
squares.forEach(square => {
    square.addEventListener('dragover', (e) => e.preventDefault()); // allow drop

    // drop/move
    square.addEventListener('drop', (e) => {
        e.preventDefault();
        const targetSquare = e.target.closest('.square');// only drop onto squares

        const startRow = parseInt(startSquare.id) - 1; // 1a -> 1 -> 0
        const startCol = startSquare.id.charCodeAt(1) - 97; // 1a -> a -> 0
        const targetRow = parseInt(targetSquare.id) - 1;
        const targetCol = targetSquare.id.charCodeAt(1) - 97;
        const forewardSteps = targetRow - startRow;
        const sidewardSteps = Math.abs(targetCol - startCol);

        const isNormalMove = 
            forewardSteps === 1 &&
            sidewardSteps === 0 && 
            board[targetRow][targetCol] == 0;
        const isCapture = 
            forewardSteps === 1 &&
            sidewardSteps === 1 && 
            board[targetRow][targetCol] == 2;

        if(isNormalMove || isCapture) {
            targetSquare.innerHTML = ''; 
            targetSquare.appendChild(draggedPiece);
            board[startRow][startCol] = 0;
            board[targetRow][targetCol] = 1;

            // find legal moves
            const legalMoves = [];
            for (let iRow = 0; iRow < board.length; iRow++) {
                const row = board[iRow];
                for (let iCol = 0; iCol < row.length; iCol++) {
                    const pieceOnTile = row[iCol];
                    if(pieceOnTile == 2) { // black piece
                        if(board[iRow-1][iCol] == 0) legalMoves.push([iRow, iCol, iRow-1, iCol]); // normal move
                    }
                }
            }

            // draw lines
            let linesContent = '';
            linesContent += '<line class="arrow-line" x1="150" y1="50" x2="50" y2="150" style="stroke: darkmagenta;"/>';
            linesContent += '<line class="arrow-line" x1="150" y1="50" x2="150" y2="150" style="stroke: orange;"/>'
            linesContent += '<line class="arrow-line" x1="150" y1="50" x2="250" y2="150" style="stroke: blue;"/>';
            linesContent += '<line class="arrow-line" x1="250" y1="50" x2="250" y2="150" style="stroke: chartreuse;"/>';
            lines.innerHTML = linesContent;

            whiteCanMove = false;
            document.body.classList.remove('white-can-move');
            auswahlButton.disabled = false;
        }
    });
});

auswahlButton.addEventListener('click', () => {
    selection.style.color = "darkmagenta";

    auswahlButton.disabled = true;
    durchfuehrenButton.disabled = false;
});

durchfuehrenButton.addEventListener('click', () => {
    lines.innerHTML = '';

    durchfuehrenButton.disabled = true;
    whiteCanMove = true;
    document.body.classList.add('white-can-move');
});
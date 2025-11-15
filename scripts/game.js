let roundFinished = false;
let whitesTurn = true;
const colors = ['darkmagenta', 'orange', 'blue', 'chartreuse', 'deeppink'];

let board = [
    [1, 1, 1],
    [0, 0, 0],
    [2, 2, 2]
]; // THE VISUAL REPRESENTATION IS MIRRORED HORIZONTALLY
const tile00 = document.getElementById('1a');
const tile01 = document.getElementById('1b');
const tile02 = document.getElementById('1c');
const tile10 = document.getElementById('2a');
const tile11 = document.getElementById('2b');
const tile12 = document.getElementById('2c');
const tile20 = document.getElementById('3a');
const tile21 = document.getElementById('3b');
const tile22 = document.getElementById('3c');
const boardDivs = [
    [tile00, tile01, tile02],
    [tile10, tile11, tile12],
    [tile20, tile21, tile22]
];

const auswahlButton = document.getElementById('auswahlButton');
const selectionCircle = document.getElementById('selection');
const durchfuehrenButton = document.getElementById('durchfuehrenButton');
const lines = document.getElementById('lines');
const notification = document.getElementById('notification')

function isLegalMove(startRow, startCol, targetRow, targetCol) {
    const isColorWhite = board[startRow][startCol] == 1;
    const forewardSteps = (targetRow - startRow) * (isColorWhite ? 1 : -1);
    const sidewardSteps = Math.abs(targetCol - startCol);

    const isNormalMove = 
        forewardSteps === 1 &&
        sidewardSteps === 0 && 
        0 <= targetRow && targetRow < board.length &&
        board[targetRow][targetCol] == 0;
    const isCapture = 
        forewardSteps === 1 &&
        sidewardSteps === 1 && 
        0 <= targetRow && targetRow < board.length &&
        board[targetRow][targetCol] == (isColorWhite ? 2 : 1);

    return isNormalMove || isCapture;
}

function allLegalMoves(isColorWhite) {
    const legalMoves = [];
    for (let iRow = 0; iRow < board.length; iRow++) {
        for (let iCol = 0; iCol < board[iRow].length; iCol++) {
            if(board[iRow][iCol] == (isColorWhite ? 1 : 2)) { // piece with right color
                const targetRow = iRow + (isColorWhite ? 1 : -1);
                if(isLegalMove(iRow, iCol, targetRow, iCol-1)) legalMoves.push([iRow, iCol, targetRow, iCol-1]); // capture 1
                if(isLegalMove(iRow, iCol, targetRow, iCol)) legalMoves.push([iRow, iCol, targetRow, iCol]); // normal move
                if(isLegalMove(iRow, iCol, targetRow, iCol+1)) legalMoves.push([iRow, iCol, targetRow, iCol+1]); // capture 2
            }
        }
    }
    return legalMoves;
}

function makeMove(startRow, startCol, targetRow, targetCol) {
    const isColorWhite = board[startRow][startCol] == 1;
    board[targetRow][targetCol] = board[startRow][startCol];
    board[startRow][startCol] = 0;

    const startSquare = boardDivs[startRow][startCol];
    const targetPawn = startSquare.querySelector(isColorWhite ? '.piece-white' : '.piece-black');
    const targetSquare = boardDivs[targetRow][targetCol];

    targetSquare.innerHTML = '';
    targetSquare.appendChild(targetPawn);

    if(hasWon(isColorWhite)) {
        roundFinished = true;
        notification.value = (isColorWhite ? "White" : " Black") + " won! (press to restart)";
        notification.style.visibility = 'visible';
    }
}

function hasWon(isColorWhite) {
    const oponentHasNoLegalMoves = allLegalMoves(!isColorWhite).length == 0;
    
    const winningRow = isColorWhite ? 2 : 0;
    const myColorNumber = isColorWhite ? 1 : 2;
    const iAmOnWinningRow = (board[winningRow][0] == myColorNumber || 
                            board[winningRow][1] == myColorNumber || 
                            board[winningRow][2] == myColorNumber);

    return oponentHasNoLegalMoves || iAmOnWinningRow;
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

notification.addEventListener('click', () => {
    notification.style.visibility = 'hidden';

    board = [
        [1, 1, 1],
        [0, 0, 0],
        [2, 2, 2]
    ];
    tile00.innerHTML = '<div class="piece-white" draggable="true">&#9823</div>';
    tile01.innerHTML = '<div class="piece-white" draggable="true">&#9823</div>';
    tile02.innerHTML = '<div class="piece-white" draggable="true">&#9823</div>';
    tile10.innerHTML = '';
    tile11.innerHTML = '';
    tile12.innerHTML = '';
    tile20.innerHTML = '<div class="piece-black">&#9823</div>';
    tile21.innerHTML = '<div class="piece-black">&#9823</div>';
    tile22.innerHTML = '<div class="piece-black">&#9823</div>';

    initWhite();
    whitesTurn = true;
    roundFinished = false;
});
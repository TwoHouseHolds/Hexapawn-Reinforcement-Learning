let roundFinished = false;
let blacksTurn = false;
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

const notification = document.getElementById('notification');
const restart = document.getElementById('restart');

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

        if(isColorWhite) {
            notification.innerHTML = "White wins!";
        } else {
            notification.innerHTML = " Black wins!";
        }

        notification.style.visibility = 'visible';
        restart.style.visibility = 'visible';
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

// reset
restart.addEventListener('click', () => {
    notification.style.visibility = 'hidden';
    restart.style.visibility = 'hidden';

    board = [
        [1, 1, 1],
        [0, 0, 0],
        [2, 2, 2]
    ];
    tile00.innerHTML = '<div class="piece-white">&#9823</div>';
    tile01.innerHTML = '<div class="piece-white">&#9823</div>';
    tile02.innerHTML = '<div class="piece-white">&#9823</div>';
    tile10.innerHTML = '';
    tile11.innerHTML = '';
    tile12.innerHTML = '';
    tile20.innerHTML = '<div class="piece-black" draggable="true">&#9823</div>';
    tile21.innerHTML = '<div class="piece-black" draggable="true">&#9823</div>';
    tile22.innerHTML = '<div class="piece-black" draggable="true">&#9823</div>';

    initBlack();
    blacksTurn = false;
    roundFinished = false;
    doWhiteMove();
});
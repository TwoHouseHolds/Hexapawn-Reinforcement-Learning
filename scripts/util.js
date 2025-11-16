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

function arrays2DEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        const row1 = arr1[i];
        const row2 = arr2[i];
        if (row1.length !== row2.length) {
            return false;
        }
        for (let j = 0; j < row1.length; j++) {
            if (row1[j] !== row2[j]) {
                return false;
            }
        }
    }
    return true;
}
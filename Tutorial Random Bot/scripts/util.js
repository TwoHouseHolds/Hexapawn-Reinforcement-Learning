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
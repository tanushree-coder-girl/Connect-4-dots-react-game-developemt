export const isWinner = (gameboard, currentMove, currentPlayer) => {
    const board = [...gameboard]
    board[currentMove] = currentPlayer

    const winningLines = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12],
    ]

    for (let i = 0; i < winningLines.length; i++) {
        const [c1 ,c2, c3, c4] = winningLines[i];
        if (board[c1] > 0 && board[c1] === board[c2] && board[c2] === board[c3] && board[c3] === board[c4]) {
            return true;
        }
    }

    return false
}

export const isDraw = (gameboard, currentMove, currentPlayer) => {
    let board = [...gameboard];
    board[currentMove] = currentPlayer;

    let count = board.reduce((n, x) => {
        return n + (x === 0)
    }, 0)

    return count === 0
}

const getPosition = (gameBoard, moveChecks) => {
    for (let check = 0; check < moveChecks.length; check++) {
        for (let i = 0; i < moveChecks[check].max; i+=moveChecks[check].step) {
            const series = 
            gameBoard[i + moveChecks[check].indexes[0]].toString() + 
            gameBoard[i + moveChecks[check].indexes[1]].toString() + 
            gameBoard[i + moveChecks[check].indexes[2]].toString() + 
            gameBoard[i + moveChecks[check].indexes[3]].toString();

            switch (series) {
                case '1110':
                case '2220':
                    return i + moveChecks[check].indexes[3];
                case '1101':
                case '2202':
                    return i + moveChecks[check].indexes[2];   
                case '1011':
                case '2022':
                    return i + moveChecks[check].indexes[1];   
                case '0111':
                case '0222':
                    return i + moveChecks[check].indexes[0];                  
                default:
                    break;
            }
        }        
    }
    return -1
}

const getRandomComputerMove = (gameboard) => {
    // Basics
    let validMoves = [];
    for (let i = 0; i < gameboard.length; i++) {
        if (gameboard[i] === 0) validMoves.push(i)
    }
    let randomMove = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomMove]
}

export const getComputerMove = (gameboard) => {
    // Advanced computer AI. 
    let moveChecks = [
        //vertical
        {
            indexes: [0, 4, 8, 12],
            max: 4,
            step: 1
        },
        // horizontal
        {
            indexes: [0, 1, 2, 3],
            max: 16,
            step: 4
        },
        // diagonal 
        {
            indexes: [0, 5, 10, 15],
            max: 16,
            step: 16
        },
        // diagonal 
        {
            indexes: [3, 6, 9, 12],
            max: 16,
            step: 16
        }
    ]; 

    let position = getPosition(gameboard,moveChecks);
    if(position > -1) return position;
    return getRandomComputerMove(gameboard);
}

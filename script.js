function Gameboard() {
    let board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

    const getBoard = () => board;

    const markSquare = (row, column, sign) => {
        board[row][column] = sign;
    };

    const resetBoard = () => {
        board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    };

    const printBoard = () => {
        board.forEach(row => {
            console.log(`${row[0]} ${row[1]} ${row[2]}`);
        })
    };

    return { getBoard, markSquare, resetBoard, printBoard };
}

function Players() {
    let players = [{ name: "player1", sign: "X" }, { name: "player2", sign: "O" }];

    const getPlayers = () => players;

    const updatePlayer = (oldName, newName) => {
        players.forEach(player => {
            if (player.name === oldName) {
                player.name = newName;
            }
        })
    };

    const resetPlayers = () => {
        players = [{ name: "player1", sign: "X" }, { name: "player2", sign: "O" }];
    };

    return { getPlayers, updatePlayer, resetPlayers };
}

function GameController() {
    const gameboard = Gameboard();
    const players = Players();

    let activePlayer = players.getPlayers()[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players.getPlayers()[0] ? players.getPlayers()[1] : players.getPlayers()[0];
    };

    const resetGame = () => {
        players.resetPlayers();
        gameboard.resetBoard();
    };

    const checkRoundOver = () => {
        const board = gameboard.getBoard();

        if ((board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X") ||
            (board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X") ||
            (board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X") ||
            (board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X") ||
            (board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X") ||
            (board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X") ||
            (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") ||
            (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X")) {
            console.log("Player 1 wins!");
            resetGame();
        } else if ((board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O") ||
            (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O") ||
            (board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O") ||
            (board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O") ||
            (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O") ||
            (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O") ||
            (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") ||
            (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")) {
            console.log("Player 2 wins!");
            resetGame();
        } else {
            let isBoardFull = true;
            board.forEach(row => {
                row.forEach(sign => {
                    if (sign === "-") {
                        isBoardFull = false;
                    }
                })
            })
            
            if (isBoardFull) {
                console.log("It's a tie!");
                resetGame();
            }
        }
    };

    const playRound = (row, column) => {
        gameboard.markSquare(row, column, activePlayer.sign);

        switchPlayerTurn();
        gameboard.printBoard();
        checkRoundOver();
    };

    return { playRound, resetGame };
}

const game = GameController();
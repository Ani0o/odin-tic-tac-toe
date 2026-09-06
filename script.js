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
        });
    };

    return { getBoard, markSquare, resetBoard, printBoard };
}

function Players() {
    let players = [{ name: "Player 1", sign: "X" }, { name: "Player 2", sign: "O" }];

    const getPlayers = () => players;

    const updatePlayer = (newName) => {
        players.forEach(player => {
            if (newName.player === "player1") {
                players[0].name = newName.name;
            } else {
                players[1].name = newName.name;
            }
        });
    };

    const resetPlayers = () => {
        players = [{ name: "Player 1", sign: "X" }, { name: "Player 2", sign: "O" }];
    };

    return { getPlayers, updatePlayer, resetPlayers };
}

function GameController(p1name, p2name) {
    const gameboard = Gameboard();
    const players = Players();

    if (p1name !== "") {
        players.updatePlayer({ player: "player1", name: p1name });
    }
    if (p2name !== "") {
        players.updatePlayer({ player: "player2", name: p2name });
    }

    let activePlayer = players.getPlayers()[0];
    let notifyText = {
        text: `${activePlayer.name}'s Turn`,
        isRoundOver: false,
    };

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players.getPlayers()[0] ? players.getPlayers()[1] : players.getPlayers()[0];
        notifyText.text = `${activePlayer.name}'s Turn`;
    };

    const getNotifyText = () => notifyText;

    const resetGame = () => {
        players.resetPlayers();
        gameboard.resetBoard();
        activePlayer = players.getPlayers()[0];
        notifyText = {
            text: `${activePlayer.name}'s Turn`,
            isRoundOver: false,
        };
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
            notifyText.text = `${players.getPlayers()[0].name} wins!`;
            notifyText.isRoundOver = true;
        } else if ((board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O") ||
            (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O") ||
            (board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O") ||
            (board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O") ||
            (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O") ||
            (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O") ||
            (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") ||
            (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")) {
            console.log("Player 2 wins!");
            notifyText.text = `${players.getPlayers()[1].name} wins!`;
            notifyText.isRoundOver = true;
        } else {
            let isBoardFull = true;
            board.forEach(row => {
                row.forEach(sign => {
                    if (sign === "-") {
                        isBoardFull = false;
                    }
                });
            });
            
            if (isBoardFull) {
                console.log("It's a tie!");
                notifyText.text = "It's a tie!";
                notifyText.isRoundOver = true;
            }
        }
    };

    const playRound = (row, column) => {
        gameboard.markSquare(row, column, activePlayer.sign);

        switchPlayerTurn();
        gameboard.printBoard();
        checkRoundOver();
    };

    return { playRound, getNotifyText, resetGame, getBoard: gameboard.getBoard };
}

function DisplayController(p1name, p2name) {
    const game = GameController(p1name, p2name);
    const boardDiv = document.querySelector(".board");
    const notifyDiv = document.querySelector(".notify");
    
    const updateScreen = () => {
        boardDiv.replaceChildren();

        const board = game.getBoard();
        const notifyText = game.getNotifyText();

        notifyDiv.textContent = notifyText.text;

        board.forEach((row, rowIndex) => {
            row.forEach((sign, colIndex) => {
                const buttonElement = document.createElement("button");
                buttonElement.classList.add("cell");

                buttonElement.dataset.row = rowIndex;
                buttonElement.dataset.column = colIndex;
                buttonElement.textContent = sign;
                boardDiv.appendChild(buttonElement);
            });
        });
    };

    boardDiv.addEventListener("click", (e) => {
        const row = e.target.dataset.row;
        const column = e.target.dataset.column;
        const notifyText = game.getNotifyText();

        if (e.target.textContent === "X" || e.target.textContent === "O") return;
        if (notifyText.isRoundOver) return;

        game.playRound(row, column);
        updateScreen();
    });

    updateScreen();
}

const startButton = document.querySelector(".start");

startButton.addEventListener("click", (e) => {
    e.preventDefault();
    startButton.innerText = "Restart Game";

    const p1name = document.querySelector("#player1-name").value;
    const p2name = document.querySelector("#player2-name").value;

    DisplayController(p1name, p2name);
});
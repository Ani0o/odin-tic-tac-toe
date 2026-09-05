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
    let players = [{ name: "player1", score: "0", sign: "X" }, { name: "player2", score: "0", sign: "O" }];

    const getPlayers = () => players;

    const updatePlayer = (oldName, newName, score) => {
        players.forEach(player => {
            if (player.name === oldName) {
                player.name = newName;
                player.score = `${score}`;
            }
        })
    };

    const resetPlayers = () => {
        players = [{ name: "player1", score: "0"}, { name: "player2", score: "0" }];
    };

    return { getPlayers, updatePlayer, resetPlayers };
}

function GameController() {
    let rounds = 0;
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
        gameboard.getBoard().forEach(row => {
            if (row[0] === "X" && row[1] === "X" && row[2] === "X") {
                console.log("Player 1 wins!");
                const player1 = players.getPlayers()[0];
                players.updatePlayer(player1.name, player1.name, Number(player1.score) + 1);
                rounds++;
                resetGame();
                return;
            } else if (row[0] === "O" && row[1] === "O" && row[2] === "O") {
                console.log("Player 2 wins!");
                const player2 = players.getPlayers()[1];
                players.updatePlayer(player2.name, player2.name, Number(player2.score) + 1);
                rounds++;
                resetGame();
                return;
            }
        })
    };

    const playTurn = (row, column) => {
        gameboard.markSquare(row, column, activePlayer.sign);

        switchPlayerTurn();
        gameboard.printBoard();
        checkRoundOver();
    };

    return { playTurn, resetGame };
}

const game = GameController();
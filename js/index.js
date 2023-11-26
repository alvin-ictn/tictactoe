let boardSize = 5;
let board = [];
let currentPlayer = 'X';
let winningCondition = 3;
let moves = 0;
let playerXScore = 0;
let playerOScore = 0;
let timerInterval;
let secondsElapsed = 0;
let moveTimeLimit = 10;

const updateScoreboard = () => {
    document.getElementById('scoreboard').textContent = `Player X: ${playerXScore} | Player O: ${playerOScore} | Timer: ${secondsElapsed}s | Moves: ${moves}`;
};

const updateScore = () => {
    currentPlayer === 'X' ? playerXScore++ : playerOScore++;
};

const resetTimer = () => {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    startTimer();
};

const startTimer = () => {
    timerInterval = setInterval(() => {
        secondsElapsed++;
        updateScoreboard();

        if (secondsElapsed === moveTimeLimit) {
            alert(`Player ${currentPlayer} took too long! Switching to the other player.`);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateScoreboard();
            resetTimer();
        }
    }, 1000);
};


const initializeBoard = () => {
    if(winningCondition > boardSize) {
        alert('Please lower your winning condition to lower than board size')
        return;
    }
    const boardElement = document.getElementById('board');
    document.documentElement.style.setProperty('--board-size', boardSize)
    boardElement.innerHTML = '';
    board = [];
    moves = 0;
    clearInterval(timerInterval);
    secondsElapsed = 0;
    updateScoreboard();

    for (let i = 0; i < boardSize; i++) {
        board.push(Array(boardSize).fill(null));

        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => handleCellClick(i, j));
            boardElement.appendChild(cell);
        }
    }

    startTimer();
}

const checkWinner = (row, col) => {
    if (board[row].join('').includes(currentPlayer.repeat(winningCondition))) return true;

    if (board.map(r => r[col]).join('').includes(currentPlayer.repeat(winningCondition))) return true;

    if (row === col && board.map((r, i) => r[i]).join('').includes(currentPlayer.repeat(winningCondition))) return true;
    if (row + col === boardSize - 1 && board.map((r, i) => r[boardSize - 1 - i]).join('').includes(currentPlayer.repeat(winningCondition))) return true;

    return false;
}

const renderBoard = () => {
    const cells = document.getElementsByClassName('cell');

    for (let i = 0; i < cells.length; i++) {
        const row = cells[i].dataset.row;
        const col = cells[i].dataset.col;

        cells[i].textContent = board[row][col] || '';
        cells[i].classList.remove('winner');
        if (checkWinner(parseInt(row), parseInt(col))) {
            cells[i].classList.add('winner');
        }
    }
}

const handleCellClick = (row, col) => {
    if (!board[row][col]) {
            board[row][col] = currentPlayer;
            moves++;
            renderBoard();
            if (checkWinner(row, col)) {
                alert(`Player ${currentPlayer} wins!`);
                updateScore();
                initializeBoard();
            } else if (board.flat().every(cell => cell !== null)) {
                alert('It\'s a draw!');
                initializeBoard();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateScoreboard();
                resetTimer();
            }
        }
}

initializeBoard();

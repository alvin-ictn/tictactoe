let boardSize = 3;
let board = [];
let currentPlayer = 'X';
let winningCondition = 3;
let moves = 0;
let playerXScore = 0;
let playerOScore = 0;
let ties = 0;
let timerInterval;
let timer = 0;
let secondsElapsed = 0;
let elapsedInterval;
let moveTimeLimit = 10;

const timeBar = document.getElementById('timeBar');
const player = document.getElementById('player');

const updateScoreboard = () => {
    const scoreboard = document.getElementById('scoreboard');
    document.querySelector('#score-x > .score-point').textContent = `${playerXScore}`
    document.querySelector('#score-tie > .score-point ').textContent = `${ties}`
    document.querySelector('#score-o > .score-point').textContent = `${playerOScore}`
    document.querySelector('#time > .time-move-point').textContent = `${secondsElapsed}s`;
    document.querySelector('#move > .time-move-point').textContent = `${moves}`;
    // scoreboard. = `Player X: ${playerXScore} | Ties: ${ties} | Player O: ${playerOScore} | Timer: ${timer}s | Moves: ${moves}`;
};

const updateScore = () => {
    currentPlayer === 'X' ? playerXScore++ : playerOScore++;
};

const resetTimer = () => {
    clearInterval(timerInterval);
    timer = 0;
    timeBar.style.transition = 'width 0s linear';
    timeBar.style.width = '0%';
    setTimeout(() => {
        timeBar.style.transition = 'width 0.5s linear';
        startTimer();
    }, 0);
};

const startTimer = () => {
    timerInterval = setInterval(() => {
        timer++;
        const percentage = (timer / moveTimeLimit) * 100;
        timeBar.style.width = `${percentage}%`;
        updateScoreboard()

        if (timer === moveTimeLimit) {
            alert(`Player ${currentPlayer} took too long! Switching to the other player.`);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateScoreboard()
            resetTimer();
            player.textContent = currentPlayer;
        }
    }, 1000);
};

const startElapsed = () => {
    setInterval(() => {
        secondsElapsed++;
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
    player.textContent = currentPlayer;
    timer = 0;
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
    startElapsed()
    startTimer();
}

const checkWinner = (row, col) => {
    const consecutiveCount = (arr) => {
        let count = 0;
        let maxCount = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === currentPlayer) {
                count++;
                maxCount = Math.max(maxCount, count);
            } else {
                count = 0;
            }
        }
        return maxCount;
    };
    if (consecutiveCount(board[row]) >= winningCondition) return true;

    if (consecutiveCount(board.map(r => r[col])) >= winningCondition) return true;

    if (row === col && consecutiveCount(board.map((r, i) => r[i])) >= winningCondition) return true;
    if (row + col === boardSize - 1 && consecutiveCount(board.map((r, i) => r[boardSize - 1 - i])) >= winningCondition) return true;

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
                ties++;
                initializeBoard();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateScoreboard();
                resetTimer();
                player.textContent = currentPlayer;
            }
        }
}

initializeBoard();

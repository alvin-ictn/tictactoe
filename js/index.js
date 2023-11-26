let boardSize = 3;
let board = [];
let currentPlayer = 'X';
let winningCondition = 3;

function initializeBoard() {
    const boardElement = document.getElementById('board');
    document.documentElement.style.setProperty('--board-size', boardSize)
    boardElement.innerHTML = '';
    board = [];

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
}

function checkWinner(row, col) {
    if (board[row].join('').includes(currentPlayer.repeat(winningCondition))) return true;

    if (board.map(r => r[col]).join('').includes(currentPlayer.repeat(winningCondition))) return true;

    if (row === col && board.map((r, i) => r[i]).join('').includes(currentPlayer.repeat(winningCondition))) return true;
    if (row + col === boardSize - 1 && board.map((r, i) => r[boardSize - 1 - i]).join('').includes(currentPlayer.repeat(winningCondition))) return true;

    return false;
}

function renderBoard() {
    const cells = document.getElementsByClassName('cell');

    for (let i = 0; i < cells.length; i++) {
        const row = cells[i].dataset.row;
        const col = cells[i].dataset.col;

        cells[i].textContent = board[row][col] || '';
        cells[i].classList.remove('winner');
        console.log(cells,"\nrow", board[row][col], "\n",row,parseInt(row), "\ncol",col,parseInt(col),"\ncheck",checkWinner(parseInt(row), parseInt(col)))
        if (checkWinner(parseInt(row), parseInt(col))) {
            cells[i].classList.add('winner');
        }
    }
}

function handleCellClick(row, col) {
    if (!board[row][col]) {
            board[row][col] = currentPlayer;
            renderBoard();
            if (checkWinner(row, col)) {
                alert(`Player ${currentPlayer} wins!`);
                initializeBoard();
            } else if (board.flat().every(cell => cell !== null)) {
                alert('It\'s a draw!');
                initializeBoard();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
}

initializeBoard();

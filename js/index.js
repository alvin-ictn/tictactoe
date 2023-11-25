let boardSize = 3;
let board = [];
let currentPlayer = 'X';

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

function renderBoard() {
    const cells = document.getElementsByClassName('cell');

    for (let i = 0; i < cells.length; i++) {
        const row = cells[i].dataset.row;
        const col = cells[i].dataset.col;

        cells[i].textContent = board[row][col] || '';
        cells[i].classList.remove('winner');
    }
}

function handleCellClick(row, col) {
    if (!board[row][col]) {
        board[row][col] = currentPlayer;
        renderBoard();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

initializeBoard();

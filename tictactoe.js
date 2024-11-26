const board = document.getElementById('board');
const winnerDisplay = document.getElementById('winner');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let isGameOver = false;

function createBoard() {
    board.innerHTML = ''; 
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleMove);
        board.appendChild(cell);
    }
}

function handleMove(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (isGameOver || gameBoard[index]) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner()) {
        winnerDisplay.textContent = `Player ${currentPlayer} wins!`;
        isGameOver = true;
        return;
    }

    if (gameBoard.every(cell => cell)) {
        winnerDisplay.textContent = 'It\'s a draw!';
        isGameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] &&
               gameBoard[a] === gameBoard[b] &&
               gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = Array(9).fill(null);
    currentPlayer = 'X';
    isGameOver = false;
    winnerDisplay.textContent = '';
    createBoard();
}
createBoard();


let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false; // Game is not active initially
let againstComputer = false; // Initially, not playing against computer


function cellClick(index) {
  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    const cell = document.getElementById(`cell${index}`);
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer); // Add class for color
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    if (gameActive) {
      updateWinningPercentage(); // Update winning percentage
    } else {
      document.querySelectorAll('.winning-percentage').forEach(percentage => percentage.style.display = 'none'); // Hide winning percentage
    }
    if (againstComputer && gameActive && currentPlayer === 'O') {
      computerMove();
    }
  }
}



function checkResult() {
  
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      document.getElementById('status').innerText = `${currentPlayer} wins!`;
      document.getElementById('home-btn').style.display = 'block'; // Show home button
      document.getElementById('restart-btn').style.display = 'block'; // Show restart button
      updateWinningPercentage(); // Update winning percentage
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameActive = false;
    document.getElementById('status').innerText = "It's a draw!";
    document.getElementById('home-btn').style.display = 'block'; // Show home button
    document.getElementById('restart-btn').style.display = 'block'; // Show restart button
    document.querySelectorAll('.winning-percentage').forEach(percentage => percentage.style.display = 'none'); // Hide winning percentage
  }
}
function restartGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  document.getElementById('status').innerText = '';
  document.getElementById('winning-percentage-x').style.display = 'none'; // Hide winning percentage for X
  document.getElementById('winning-percentage-o').style.display = 'none'; // Hide winning percentage for O
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('X', 'O'); // Remove X and O classes
  });
  document.getElementById('home-btn').style.display = 'block'; // Show home button
  document.getElementById('restart-btn').style.display = 'block'; // Show restart button
  document.getElementById('mode-selection').style.display = 'none'; // Hide mode selection buttons
  document.getElementById('game-board').classList.add('active'); // Add 'active' class to game board
}

function updateWinningPercentage() {
 
  const totalMovesX = gameBoard.filter(cell => cell === 'X').length;
  const winningPercentageX = totalMovesX / (gameBoard.length / 2) * 100;
  document.getElementById('winning-percentage-x').innerText = `Winning Percentage for X: ${winningPercentageX.toFixed(2)}%`;
  document.getElementById('winning-percentage-x').style.display = 'block'; // Show winning percentage for X


  const totalMovesO = gameBoard.filter(cell => cell === 'O').length;
  const winningPercentageO = totalMovesO / (gameBoard.length / 2) * 100;
  document.getElementById('winning-percentage-o').innerText = `Winning Percentage for O: ${winningPercentageO.toFixed(2)}%`;
  document.getElementById('winning-percentage-o').style.display = 'block'; // Show winning percentage for O
}


function twoPlayersMode() {
  againstComputer = false;
  document.getElementById('mode-selection').style.display = 'none';
  document.getElementById('game-board').classList.add('active'); // Add 'active' class to game board
  document.getElementById('restart-btn').style.display = 'block';
  document.getElementById('buttons').style.display = 'flex'; // Show buttons
  gameActive = true;
}

// Function to handle computer mode
function computerMode() {
  againstComputer = true;
  document.getElementById('mode-selection').style.display = 'none';
  document.getElementById('game-board').classList.add('active'); // Add 'active' class to game board
  document.getElementById('restart-btn').style.display = 'block';
  document.getElementById('buttons').style.display = 'flex'; // Show buttons
  gameActive = true;
  if (currentPlayer === 'O') {
    computerMove();
  }
}


function computerMove() {
  
  const emptyCells = gameBoard.reduce((acc, cell, index) => {
    if (cell === '') acc.push(index);
    return acc;
  }, []);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  cellClick(emptyCells[randomIndex]);
}


function goToMainMenu() {
  document.getElementById('mode-selection').style.display = 'block';
  document.getElementById('game-board').classList.remove('active'); // Remove 'active' class from game board
  document.getElementById('restart-btn').style.display = 'none'; // Hide restart button
  document.getElementById('home-btn').style.display = 'none'; // Hide home button
  document.querySelectorAll('.winning-percentage').forEach(percentage => percentage.style.display = 'none'); // Hide winning percentages

 
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = false;
  document.getElementById('status').innerText = '';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('X', 'O'); 
  });
}


document.getElementById('two-players-btn').addEventListener('click', twoPlayersMode);
document.getElementById('computer-btn').addEventListener('click', computerMode);
document.getElementById('restart-btn').addEventListener('click', restartGame);
document.getElementById('home-btn').addEventListener('click', goToMainMenu);


document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.id.replace('cell', ''));
    cellClick(index);
  });
});


document.getElementById('game-board').classList.remove('active');
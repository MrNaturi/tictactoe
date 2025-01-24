const gameOver = document.getElementById("gameOverDialog");

const GameBoard = (function () {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  function createPlayer(name, piece) {
    function gameController() {
      const options = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
      ];
      for (let option of options) {
        const [a, b, c] = option;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
      return gameBoard.includes('') ? null : 'draw';
    }

    const move = (index) => {
      if (gameBoard[index] === '') {
        gameBoard[index] = piece;
        const winner = gameController();
        if (winner) {
          updateUI();
          gameOver.innerHTML = `<h1>${winner === "draw" ? "It's a draw!" : `${name} wins!`}</h1><button id="startOverButton">Start Over</button>`;
          gameOver.showModal();
          document.getElementById('startOverButton').onclick = () => {
            form.style.display="block";
            gameOver.close();
          };
          console.log(winner === "draw" ? "It's a draw!" : `${name} wins!`);
          disableButtons();
          return;
        }
        updateUI();
        return true;
      } else {
        console.log("Invalid Move");
        return false;
      }
    };

    return { move };
  }

  function updateUI() {
    document.querySelectorAll('.selectors').forEach((button, index) => {
      button.innerText = gameBoard[index];
    });
  }

  function disableButtons() {
    document.querySelectorAll('.selectors').forEach((button) => {
      button.disabled = true;
    });
  }

  return { createPlayer, gameBoard };
})();

const board = document.getElementById('board');
board.style.display = 'grid';
board.style.gridTemplateColumns = 'repeat(3, 100px)';
board.style.gridTemplateRows = 'repeat(3, 100px)';
board.style.gap = '5px';

let player1, player2, currentPlayer, prevPlayer;

function startGame(p1Name, p2Name) {
  player1 = GameBoard.createPlayer(p1Name, 'X');
  player2 = GameBoard.createPlayer(p2Name, 'O');
  currentPlayer = player1;
  prevPlayer = null;

  board.innerHTML = '';
  GameBoard.gameBoard.fill(''); 

  GameBoard.gameBoard.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';

    const button = document.createElement('button');
    button.className = 'selectors';
    button.innerText = '';
    button.style.width = '100%';
    button.style.height = '100%';
    button.style.fontSize = '24px';

    button.onclick = () => {
      const wasValidMove = currentPlayer.move(index);
      if (wasValidMove) {
        prevPlayer = currentPlayer;
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      }
    };

    cell.appendChild(button);
    board.appendChild(cell);
  });
}

const form = document.getElementById('playerForm');
form.onsubmit = (e) => {
  e.preventDefault();
  const p1Name = document.getElementById('p1Name').value || 'Player 1';
  const p2Name = document.getElementById('p2Name').value || 'Player 2';
  form.style.display = 'none'; 
  startGame(p1Name, p2Name);
};

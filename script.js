let gameBoard = ['','','','','','','','',''];

function createPlayer(name, piece){
  const move = (index) => {
    if(gameBoard[index] === ''){
        gameBoard[index] = piece
        let lastmove = name
        const winner = gameController();

 if (winner) {
  console.log(gameBoard)
   console.log(winner === "draw" ? "It's a draw!" : `${name} wins!`);
}

}else {
    console.log("Invalid Move")
    return
  }}
    return {move}
}
function gameController() {
  const options = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
  for (let option of options) {
    const [a,b,c] =  option;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a]
    }
  }
  return gameBoard.includes("") ? null : "draw"; 
}
const player1 = createPlayer("player1", "x")
const player2 = createPlayer("player2", "o")
player1.move(1)
player2.move(2)
player1.move(3)
player2.move(4)
player1.move(5)
player2.move(7)
player1.move(6)
player2.move(0)
player1.move(8)
console.log(gameBoard)

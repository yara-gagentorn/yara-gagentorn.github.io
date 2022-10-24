// sound effects
const xSound = new Audio('../media/ttt-x-sound.flac')
const ySound = new Audio('../media/ttt-y-sound.wav')
const tieSound = new Audio('../media/ttt-tie.wav')
const winSound = new Audio('../media/tada.wav')

// array of all cells
let cells = document.getElementsByTagName('TD')

let noughtsTurn

// for alternating first turn
let flag = localStorage.getItem('flag') === 'true'

if (flag) {
  localStorage.setItem('flag', false)
  noughtsTurn = false
} else {
  localStorage.setItem('flag', true)
  noughtsTurn = true
}

let gameIsOver = false

let isTie = false

let numberOfMoves = 0 // moves counter

let winningSet = [] // array of winning cells

// fancy pics for x and o
const Ximg =
  '<object data="../media/Ximg.svg" class="grid-style animate pop"></object>'
const Oimg =
  '<object data="../media/Oimg.svg" class="grid-style animate pop"></object>'

const XimgSM = '<object data="../media/Ximg.svg" class="img-turn"></object>'
const OimgSM = '<object data="../media/Oimg.svg" class="img-turn"></object>'

let firstMove = noughtsTurn ? OimgSM : XimgSM

document.getElementById('subtitle').innerHTML =
  'Click on a cell to start with ' + firstMove

// restart the game
document.getElementById('restart').onclick = () => window.location.reload()

function checkForWin(symbol) {
  // HORIZONTAL LINES //

  if (
    cells[0].innerHTML == symbol &&
    cells[1].innerHTML == symbol &&
    cells[2].innerHTML == symbol
  ) {
    gameIsOver = true
    winningSet.push(cells[0], cells[1], cells[2])
  } else if (
    cells[3].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[5].innerHTML == symbol
  ) {
    gameIsOver = true
    winningSet.push(cells[3], cells[4], cells[5])
  } else if (
    cells[6].innerHTML == symbol &&
    cells[7].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  ) {
    gameIsOver = true
    winningSet.push(cells[6], cells[7], cells[8])
  }

  // VERTICAL LINES //
  if (
    cells[0].innerHTML == symbol &&
    cells[3].innerHTML == symbol &&
    cells[6].innerHTML == symbol
  ) {
    gameIsOver = true
    winningSet.push(cells[0], cells[3], cells[6])
  } else if (
    cells[1].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[7].innerHTML == symbol
  ) {
    gameIsOver = true
    winningSet.push(cells[1], cells[4], cells[7])
  } else if (
    cells[2].innerHTML == symbol &&
    cells[5].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  ) {
    gameIsOver = true
    winningSet.push(cells[2], cells[5], cells[8])
  }

  // DIAGONAL LINES //
  if (
    cells[0].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[8].innerHTML == symbol
  ) {
    gameIsOver = true
    winningSet.push(cells[0], cells[4], cells[8])
  } else if (
    cells[2].innerHTML == symbol &&
    cells[4].innerHTML == symbol &&
    cells[6].innerHTML == symbol
  ) {
    gameIsOver = true
    winningSet.push(cells[2], cells[4], cells[6])
  }

  // check for a tie
  numberOfMoves += 1

  if (numberOfMoves === 9 && !gameIsOver) {
    // if game is not over but it was 9 moves it is a tie
    tieSound.play()
    document.getElementById('subtitle').innerHTML = 'IT IS A TIE'
    isTie = true
    for (let i = 0; i < 9; i++) {
      cells[i].firstChild.classList.add('jump')
    }
  }

  if (gameIsOver) {
    // update the subtitle with the winner
    let symbolSM = symbol == Ximg ? XimgSM : OimgSM
    document.getElementById('subtitle').innerHTML = symbolSM + ' WON!!!!!'
    winSound.play()
    // change style for winning row
    for (let i = 0; i < 3; i++) {
      if (symbol === Ximg) {
        winningSet[i].firstChild.classList.remove('animate', 'pop')
        winningSet[i].firstChild.classList.add('wiggle')
      } else {
        winningSet[i].firstChild.classList.remove('animate', 'pop')
        winningSet[i].firstChild.classList.add('jump')
      }
    }

    // remove event listener from cells
    for (let i = 0; i < cells.length; i++) {
      cells[i].onclick = null
    }
  }
}

let thisPage = window.location.href

function placeSymbol(cell, symbol) {
  cell.innerHTML = symbol // put the symbol inside the cell
  console.log(symbol)
  if (
    symbol ==
    '<object data="../media/Ximg.svg" class="grid-style animate pop"></object>'
  ) {
    xSound.play()
  } else {
    ySound.play()
  }
  let nextSymbol
  nextSymbol = symbol == Ximg ? OimgSM : XimgSM // whos turn is next

  checkForWin(symbol) // check to see if the player won with that move
  if (!gameIsOver && !isTie) {
    noughtsTurn = !noughtsTurn
    document.getElementById('subtitle').innerHTML =
      "It's " + nextSymbol + ' turn'
  }
}

function cellClicked(e) {
  let cell = e.target

  if (cell.innerHTML == 0) {
    if (noughtsTurn) {
      placeSymbol(cell, Oimg)
    } else {
      placeSymbol(cell, Ximg)
    }
  }
}

for (let i = 0; i < cells.length; i++) {
  cells[i].onclick = cellClicked
}

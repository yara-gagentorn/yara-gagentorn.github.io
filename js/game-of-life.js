//const size = 50 // board size
const size = [30, 30]
const array = ['dead', 'alive'] // add more "alive"/"dead" if you want change proportion on the random board

// get random class - alive or dead  -for random board
let randomClass = () => {
  let randomEl = array[Math.floor(Math.random() * array.length)]
  return randomEl
}

//create a random board
function createRandomBoard(size) {
  // if board already there, clean it
  if (document.getElementById('game-board').innerHTML !== '') {
    document.getElementById('game-board').innerHTML = ''
  }
  for (let y = 1; y <= size[0]; y++) {
    newTR = document.createElement('tr')
    newTR.setAttribute('id', 'row' + y)
    document.getElementById('game-board').appendChild(newTR)
    for (let x = 1; x <= size[1]; x++) {
      newTD = document.createElement('td')
      newTD.setAttribute('id', 'x' + x + 'y' + y)
      let newClass = randomClass()
      newTD.classList.add(newClass)
      newTD.onclick = markDeadAlive
      document.getElementById('row' + y).appendChild(newTD)
    }
  }
}

// create an empty board for a custom game
function createEmptyBoard(size) {
  //console.log('here')
  for (let y = 1; y <= size[0]; y++) {
    newTR = document.createElement('tr')
    newTR.setAttribute('id', 'row' + y)
    document.getElementById('game-board').appendChild(newTR)
    for (let x = 1; x <= size[1]; x++) {
      newTD = document.createElement('td')
      newTD.setAttribute('id', 'x' + x + 'y' + y)
      newTD.classList.add('dead')
      newTD.onclick = markDeadAlive
      document.getElementById('row' + y).appendChild(newTD)
    }
  }
}

// for custom game and empty board: mark the cell (onclick)
function markDeadAlive(myTD) {
  let clickedTD = myTD.target
  if (clickedTD.classList.contains('dead')) {
    clickedTD.classList.remove('dead')
    clickedTD.classList.add('alive')
  } else {
    clickedTD.classList.remove('alive')
    clickedTD.classList.add('dead')
  }
}

// check if element exist
function isExist(x, y) {
  if (
    document.getElementById(`x${x}y${y}`) == undefined ||
    x > size ||
    y > size
  ) {
    return false
  } else return true
}

//create an array of neighbourhood cells
function getCoorAround(x, y) {
  let around = []
  if (isExist(x - 1, y - 1)) {
    around.push(`x${x - 1}y${y - 1}`)
  }
  if (isExist(x, y - 1)) {
    around.push(`x${x}y${y - 1}`)
  }
  if (isExist(x + 1, y - 1)) {
    around.push(`x${x + 1}y${y - 1}`)
  }
  if (isExist(x - 1, y)) {
    around.push(`x${x - 1}y${y}`)
  }
  if (isExist(x + 1, y)) {
    around.push(`x${x + 1}y${y}`)
  }
  if (isExist(x - 1, y + 1)) {
    around.push(`x${x - 1}y${y + 1}`)
  }
  if (isExist(x, y + 1)) {
    around.push(`x${x}y${y + 1}`)
  }
  if (isExist(x + 1, y + 1)) {
    around.push(`x${x + 1}y${y + 1}`)
  }
  return around
}

// count how many alive neighbours
function countAlive(around) {
  let state
  let counterAlive = around
    .map((elem) => {
      state = document.getElementById(elem).classList.contains('alive')
      return state
    })
    .reduce((acc, current) => acc + current, 0)

  return counterAlive
}

function getNewBoard() {
  function getNewStates() {
    let newStatesArr = []
    // creates an array with the new states
    let around = 0
    let aliveAround = 0
    let isAlive = false
    let currentCell
    // for each element count alive around
    for (let y = 1; y <= size[0]; y++) {
      for (let x = 1; x <= size[1]; x++) {
        currentCell = document.getElementById('x' + x + 'y' + y)
        around = getCoorAround(x, y)
        aliveAround = countAlive(around)
        isAlive = currentCell.classList.contains('alive')

        if (isAlive && aliveAround < 2) {
          newStatesArr.push(false)
        }
        if (isAlive && aliveAround > 3) {
          newStatesArr.push(false)
        }

        if (isAlive && (aliveAround === 2 || aliveAround === 3)) {
          newStatesArr.push(true)
        }

        if (!isAlive && aliveAround === 3) {
          newStatesArr.push(true)
        }

        if (!isAlive && aliveAround !== 3) {
          newStatesArr.push(false)
        }
      }
    }
    return newStatesArr
  }

  let newStatesArr = getNewStates()
  document.getElementById('game-board').innerHTML = ''
  let i = 0
  for (let y = 1; y <= size[0]; y++) {
    newTR = document.createElement('tr')
    newTR.setAttribute('id', 'row' + y)
    document.getElementById('game-board').appendChild(newTR)
    for (let x = 1; x <= size[1]; x++) {
      newTD = document.createElement('td')
      newTD.setAttribute('id', 'x' + x + 'y' + y)
      if (newStatesArr[i]) {
        i++
        newTD.classList.add('alive')
      } else {
        i++
        newTD.classList.add('dead')
      }
      document.getElementById('row' + y).appendChild(newTD)
    }
  }
}

createEmptyBoard(size)

// if ticked there is no spaces between cells
function isSpace() {
  if (document.getElementById('is-space').checked) {
    document.getElementById('game-board').classList.add('game-board-no-spaces')
  } else {
    document
      .getElementById('game-board')
      .classList.remove('game-board-no-spaces')
  }
}

function isCircle() {
  let allTD = document.getElementsByTagName('TD')
  if (document.getElementById('is-circle').checked) {
    console.log(document.getElementsByTagName('TD'))
    for (let i = 0; i < allTD.length; i++) {
      allTD.item(i).classList.add('circle')
    }
  } else {
    for (let i = 0; i < allTD.length; i++) {
      allTD.item(i).classList.remove('circle')
    }
  }
}

// if circles - link css file
function tableWithCircles() {
  if (document.getElementById('is-circle').checked) {
    let newLink = document.createElement('link')
    newLink.setAttribute('rel', 'stylesheet')
    newLink.setAttribute('href', '../styles/circles.css')
    newLink.setAttribute('id', 'round-cells')
    document.getElementsByTagName('HEAD')[0].appendChild(newLink)
  } else {
    document.getElementById('round-cells').remove()
  }
}

function startCustomGame() {
  setInterval(getNewBoard, 200)
}

function startRandomGame() {
  createRandomBoard(size)
}

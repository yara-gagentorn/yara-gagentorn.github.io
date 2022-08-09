const size = 20 // board size
const array = ['dead', 'alive'] // add more "alive"/"dead" if you want change proportion on the random board

// get random class - alive or dead  -for random board
let randomClass = () => {
  let randomEl = array[Math.floor(Math.random() * array.length)]
  return randomEl
}

//create a random board
function createRandomBoard(size) {
  console.log('creating random board')
  // if board already there, clean it
  if (document.getElementById('game-board').innerHTML !== '') {
    document.getElementById('game-board').innerHTML = ''
  }
  for (let y = 1; y <= size; y++) {
    newTR = document.createElement('tr')
    newTR.setAttribute('id', 'row' + y)
    document.getElementById('game-board').appendChild(newTR)
    for (let x = 1; x <= size; x++) {
      newTD = document.createElement('td')
      newTD.setAttribute('id', 'x' + x + 'y' + y)
      let newClass = randomClass()
      newTD.classList.add(newClass)
      document.getElementById('row' + y).appendChild(newTD)
    }
  }
}

// create an empty board for a custom game
function createEmptyBoard(size) {
  console.log('here')
  for (let y = 1; y <= size; y++) {
    newTR = document.createElement('tr')
    newTR.setAttribute('id', 'row' + y)
    document.getElementById('game-board').appendChild(newTR)
    for (let x = 1; x <= size; x++) {
      newTD = document.createElement('td')
      newTD.setAttribute('id', 'x' + x + 'y' + y)
      newTD.classList.add('dead')
      //newTD.innerHTML = 'o'
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

let counterAlive = 0

// count how many alive neighbours
function countAlive(around) {
  let state
  let deadAliveArr = around
    .map((elem) => {
      counterAlive = 0
      if (document.getElementById(elem)) {
        state = document.getElementById(elem).classList.contains('alive')
      }
      if (state === undefined) {
        state = 0
      }
      if (state) {
        counterAlive = counterAlive + 1
      }
      return state
    })
    .reduce((acc, current) => acc + current, 0)

  return deadAliveArr
}

// // creates an array with the new states
// function getNewStates() {
//   console.log('getting new states')
//   let around = 0
//   let aliveAround = 0
//   let isAlive = false
//   let currentCell
//   // for each element count alive around
//   for (let y = 1; y <= size; y++) {
//     for (let x = 1; x <= size; x++) {
//       //console.log('here')
//       currentCell = document.getElementById('x' + x + 'y' + y)
//       //console.log(currentCell)
//       around = getCoorAround(x, y)
//       //console.log(around)
//       aliveAround = countAlive(around)
//       //console.log('x' + x + 'y' + y, 'mark alive')
//       //currentCell.innerHTML = aliveAround
//       isAlive = currentCell.classList.contains('alive')
//       //console.log(x, y, isAlive)

//       if (isAlive && aliveAround < 2) {
//         newStatesArr.push(false)
//       }
//       if (isAlive && aliveAround > 3) {
//         newStatesArr.push(false)
//       }

//       if (isAlive && (aliveAround === 2 || aliveAround === 3)) {
//         newStatesArr.push(true)
//       }

//       if (!isAlive && aliveAround === 3) {
//         newStatesArr.push(true)
//       }

//       if (!isAlive && aliveAround !== 3) {
//         newStatesArr.push(false)
//       }
//     }
//   }
//   return newStatesArr
// }

//let arr = getNewStates()

function getNewBoard() {
  function getNewStates() {
    let newStatesArr = []
    // creates an array with the new states
    console.log('getting new states')
    let around = 0
    let aliveAround = 0
    let isAlive = false
    let currentCell
    // for each element count alive around
    for (let y = 1; y <= size; y++) {
      for (let x = 1; x <= size; x++) {
        //console.log('here')
        currentCell = document.getElementById('x' + x + 'y' + y)
        //console.log(currentCell)
        around = getCoorAround(x, y)
        //console.log(around)
        aliveAround = countAlive(around)
        //console.log('x' + x + 'y' + y, 'mark alive')
        //currentCell.innerHTML = aliveAround
        isAlive = currentCell.classList.contains('alive')
        //console.log(x, y, isAlive)

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

  console.log('get new board with ')
  document.getElementById('game-board').innerHTML = ''
  let i = 0
  for (let y = 1; y <= size; y++) {
    newTR = document.createElement('tr')
    newTR.setAttribute('id', 'row' + y)
    document.getElementById('game-board').appendChild(newTR)
    for (let x = 1; x <= size; x++) {
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

function renewBoard() {
  console.log('i am here, renew board')
  getNewBoard()
}

function startCustomGame() {
  setInterval(renewBoard, 1000)
}

function startRandomGame() {
  createRandomBoard(size)
  //let newStatesArr = newStatesArr()
  // getNewBoard()
  // setInterval(renewBoard, 200)
}

//getNewBoard()
// let arr = getNewStates()
// setInterval(renewBoard, 200)

//--- IMPORTS FOR GLOBAL LEADERBOARD ---//

import {
  createScore,
  getAllRecords,
  deleteAllRecordsExcept,
} from './firebase/ns-leaderboard-helper.js'

import { firestore } from './firebase/config.js'

// createScore(numberOfnumbers, score, username, firestore)
//createScore('10', '15', 'testfromapp', firestore)

//--- SOUNDS ---//

const numberClick = new Audio('../media/click.wav')
const winSound = new Audio('../media/winSound.mp3')

//--- FONTS AND STYLES---//

const fontFamilies = [
  "'Abril Fatface', cursive",
  "'Alfa Slab One', cursive",
  "'Anton', sans-serif",
  "'Barlow', sans-serif",
  "'Comfortaa', cursive",
  "'Edu VIC WA NT Beginner', cursive",
  "'Fredoka One', cursive",
  "'Lobster', cursive",
  "'Lobster Two', cursive",
  "'Mochiy Pop One', sans-serif",
  "'Orbitron', sans-serif",
  "'Parisienne', cursive",
  "'Quicksand', sans-serif",
  "'Rampart One', cursive",
  "'Shadows Into Light', cursive",
  "'Titan One', cursive",
]

const fontStyles = ['normal', 'italic']

let howManyNumbers = document.getElementById('input-how-many-numbers').value
document.getElementById('leaderboard').innerHTML = ''
generateGameField(howManyNumbers)

let finishTimeSec = 0

// random element from array
function getRandomElement(array) {
  let randomEl = array[Math.floor(Math.random() * array.length)]
  return randomEl
}

// generate random color
function randomColor(elem) {
  let someColor = Math.floor(Math.random() * 16777215).toString(16)
  elem.style.color = '#' + someColor
}

// generate random font style and weight
function randomStyleAndWeight(elem) {
  elem.style.fontStyle = getRandomElement(fontStyles)
  elem.style.fontWeight = Math.floor(Math.random() * 900)
}

// select random font from the list
function randomFont(elem) {
  elem.style.fontFamily = getRandomElement(fontFamilies)
}

// generate font size
function randomSize(elem) {
  elem.style.fontSize = Math.floor(Math.random() * 4 + 4) + 'rem'
}

function randomAlign(elem) {
  const alignOpt = ['baseline', 'top', 'middle', 'bottom']
  elem.verticalAlign = getRandomElement(alignOpt)
}

function randomMargin(elem) {
  const marg = -Math.floor(Math.random() * 15)
  elem.style.marginTop = `${marg}px`
}

function randomRotate(elem) {
  //angle between -30deg and 30deg
  let angle = Math.floor(Math.random() * 50)
  angle *= Math.round(Math.random()) ? 1 : -1
  elem.style.transform = `rotate(${angle}deg)`
}

// apply all styles
function assignStyle(elem) {
  randomMargin(elem)
  randomColor(elem)
  randomFont(elem)
  randomSize(elem)
  randomStyleAndWeight(elem)
  randomAlign(elem)
}

// create an array of numbers
function getArray(firstNumber, lastNumber) {
  let arr = []
  for (let i = firstNumber; i <= lastNumber; i++) {
    arr.push(i)
  }
  return arr
}

//----- GAME FIELD ----//

function generateGameField(howManyNumbers) {
  document.getElementById('game-field').innerHTML = ''
  document.getElementById('records').innerHTML = ''
  showRecord()
  document.getElementById('leaderboard').innerHTML = ''
  displayRatingOnPage(howManyNumbers, 'leaderboard', 3)

  let arr = getArray(1, howManyNumbers)
  let i = howManyNumbers
  let randomNum
  let newDiv
  let randomEl

  while (i > 0) {
    i--
    newDiv = document.createElement('div')
    randomEl = getRandomElement(arr)
    randomNum = parseInt(randomEl)
    arr.splice(arr.indexOf(randomEl), 1)
    newDiv.innerHTML = randomNum + ' '
    newDiv.setAttribute('id', randomNum + 'n')
    newDiv.setAttribute('class', 'num-div')
    assignStyle(newDiv)
    // check border, rotate and shake boxes
    document.getElementById('is-rotate').checked ? randomRotate(newDiv) : ''
    if (document.getElementById('is-border').checked) {
      newDiv.style.border = '2px solid'
      newDiv.style.margin = '-2px -1px -2px -1px'
    }
    //  onClick function only for the first number is 1
    if (randomNum === 1) {
      newDiv.onclick = clickOnNumber
    }
    document.getElementById('game-field').appendChild(newDiv)
    if (document.getElementById('is-shaking').checked) {
      shakeIt()
    }
  }
}

//------ SHAKE IT BABY -------//

function shakeIt() {
  let randomTime = function () {
    return Math.random() * 2 + 0.3
  }
  let randomAngle = function () {
    let angle = Math.floor(Math.random() * 30)
    angle *= Math.round(Math.random()) ? 1 : -1
    return angle
  }
  Array.from(document.getElementsByClassName('num-div')).map((div) => {
    div.style.animation = `shakeNoRotate ${randomTime()}s infinite`
    div.style.setProperty('--rotation', `rotate(${randomAngle()}deg)`)
  })
}

//----- TIMER -------//

let gameTime
let gtm = 0

function startGameTimer() {
  gameTime = setInterval(() => {
    gtm += 100
    document.getElementById('timer-span').innerHTML = gtm / 1000
  }, 100)
}

//--- CLICK ON NUMBER ---//

let nextDivID = '1n'

function clickOnNumber(number) {
  let clickedNumDiv = number.target

  if (parseInt(clickedNumDiv.innerHTML) === 1) {
    startGameTimer()
    numberClick.play()
    document.getElementById('input-how-many-numbers').disabled = true
  }

  clickedNumDiv.classList.add('clicked-num')
  clickedNumDiv.onclick = ''
  if (
    parseInt(clickedNumDiv.innerHTML) ==
    document.getElementById('input-how-many-numbers').value
  ) {
    finishTimeSec = gtm / 1000
    recordTheBest(finishTimeSec)
    showWin(finishTimeSec)
    winSound.play()
    clearInterval(gameTime)
    return
  }

  nextDivID = parseInt(clickedNumDiv.innerHTML) + 1 + 'n'
  document.getElementById('click-next-spn').innerHTML =
    parseInt(clickedNumDiv.innerHTML) + 1
  document.getElementById(nextDivID).onclick = clickOnNumber
  numberClick.play()
}

// show the next number as a hint
function showHint() {
  if (nextDivID === '1n') {
    document.getElementById('1n').style.animation = ''
    document.getElementById('1n').classList.add('pop')
    const deleteClass = setTimeout(() => {
      document.getElementById('1n').classList.remove('pop')
      document.getElementById(
        '1n'
      ).style.animation = `shakeNoRotate 1s infinite`
      document
        .getElementById('1n')
        .style.setProperty('--rotation', `rotate(15deg)`)
    }, 1000)
  } else {
    document.getElementById(nextDivID).style.animation = ''
    document.getElementById(nextDivID).classList.add('pop')
    const deleteClass = setTimeout(() => {
      document.getElementById(nextDivID).classList.remove('pop')
      document.getElementById(
        nextDivID
      ).style.animation = `shakeNoRotate 1s infinite`
      document
        .getElementById(nextDivID)
        .style.setProperty('--rotation', `rotate(15deg)`)
    }, 1000)
    gtm += 5000 // add 5 sec to a timer when use a hint
  }
}

document.getElementById('hint-btn').onclick = showHint

//----- LOCAL RECORDS -----//

function recordTheBest(finishTimeSec) {
  let oldRecord = JSON.parse(
    localStorage.getItem(`bestRecordfor${howManyNumbers}`)
  )
  let newResult = {
    howManyNumbers: howManyNumbers,
    timeInSeconds: finishTimeSec,
  }

  if (oldRecord) {
    if (
      oldRecord.timeInSeconds > newResult.timeInSeconds ||
      oldRecord === undefined
    ) {
      localStorage.setItem(
        `bestRecordfor${howManyNumbers}`,
        JSON.stringify(newResult)
      )
      document.getElementById('new-record').innerHTML = 'It is a new record!'
    }
  } else {
    localStorage.setItem(
      `bestRecordfor${howManyNumbers}`,
      JSON.stringify(newResult)
    )
    document.getElementById('new-record').innerHTML = 'It is a new record!'
  }
}

// show record for the current number
function showRecord() {
  document.getElementById('reset-records').style.visibility = 'hidden'
  let oldRecord = JSON.parse(
    localStorage.getItem(`bestRecordfor${howManyNumbers}`)
  )
  if (oldRecord) {
    let result = `Best time for  ${howManyNumbers} numbers is ${oldRecord.timeInSeconds} seconds`
    document.getElementById('records').innerHTML = result
    document.getElementById('reset-records').style.visibility = 'visible'
  } else {
    document.getElementById('reset-records').style.visibility = 'hidden'
  }
}

//showRecord()

document.getElementById('reset-records').onclick = resetRecords

function resetRecords() {
  localStorage.clear()
  document.getElementById('records').innerHTML = ''
  document.getElementById('reset-records').style.visibility = 'hidden'
}

//--- ADDITIONAL OPTIONS ---//

// if tick rotate - add style
document.getElementById('is-rotate').onclick = toggleRotation

function toggleRotation() {
  if (document.getElementById('is-rotate').checked) {
    Array.from(document.getElementsByClassName('num-div')).map((div) =>
      randomRotate(div)
    )
  } else {
    Array.from(document.getElementsByClassName('num-div')).map(
      (div) => (div.style.transform = null)
    )
  }
}

// if tick borders - add border
document.getElementById('is-border').onclick = toggleBorders

function toggleBorders() {
  if (document.getElementById('is-border').checked) {
    Array.from(document.getElementsByClassName('num-div')).map((div) => {
      div.style.border = '2px solid'
      div.style.margin = '-2px -1px -2px -1px'
    })
  } else {
    Array.from(document.getElementsByClassName('num-div')).map((div) => {
      div.style.border = null
      div.style.margin = null
    })
  }
}

// if tick shake it
document.getElementById('is-shaking').onclick = toggleShake

function toggleShake() {
  if (document.getElementById('is-shaking').checked) {
    shakeIt()
  } else {
    Array.from(document.getElementsByClassName('num-div')).map((div) => {
      div.style.animation = ''
    })
  }
}

// how many numbers
document.getElementById('input-how-many-numbers').onchange = handleHowMany

function handleHowMany() {
  document.getElementById('how-many-numbers').innerHTML =
    document.getElementById('input-how-many-numbers').value
  howManyNumbers = document.getElementById('input-how-many-numbers').value
  generateGameField(howManyNumbers)
}

//--- START NEW GAME ---//
//displayRatingOnPage(howManyNumbers, 'leaderboard', 3)
document.getElementById('start-over').onclick = startOver
document.getElementById('close-button').onclick = hideWin

function startOver() {
  gtm = 0
  nextDivID = '1n'
  document.getElementById('timer-span').innerHTML = '0'
  document.getElementById('click-next-spn').innerHTML = '1'
  clearInterval(gameTime)
  generateGameField(document.getElementById('input-how-many-numbers').value)
  document.getElementById('input-how-many-numbers').disabled = false
  if (document.getElementById('game-field').style.filter) {
    hideWin()
  }
  showRecord()
}

//--- WIN ---//

// hide win window if clicked outside of it
function handleClick(event) {
  if (event.target === document.querySelector('#game-field')) {
    hideWin()
  }
}

function showWin(finishTimeSec) {
  document.getElementById('game-field').style.filter = 'blur(5px)'
  document.getElementById('win-window').style.visibility = 'visible'
  document.getElementById('win-window').style.animation = 'winPopUp 1s'
  document.getElementById('win-seconds').innerHTML = finishTimeSec
  document.getElementById('win-start-over').onclick = startOver

  document.addEventListener('click', handleClick)
}

function hideWin() {
  document.getElementById('game-field').style.filter = ''
  document.getElementById('win-window').style.visibility = 'hidden'
  document.getElementById('win-window').style.animation = ''
  document.getElementById('new-record').innerHTML = ''
  document.removeEventListener('click', handleClick)
  startOver()
}

document.getElementById('close-button').onclick = hideWin

//--- GLOBAL LEADERBOARD  WITH FIREBASE ---//

document.getElementById('save-game-data').onclick = () =>
  recordTheBestGlobal(30)

// show current rating till place in parameter
async function getRating(place) {
  const records = await getAllRecords(howManyNumbers, firestore)
  const sortedRecords = records.sort(
    (a, b) => parseFloat(a.score) - parseFloat(b.score)
  )
  if (place == 0) {
    return sortedRecords
  } else {
    const slicedRecords = sortedRecords.slice(0, place)
    return slicedRecords
  }
}

async function displayRatingOnPage(places, location, numberOfRecords) {
  // get three first places
  const tableContainer = document.getElementById(location)
  //const records = await getAllRecords(places, firestore)
  const records = await getRating(5)
  if (records.length == 0) {
    tableContainer.innerHTML = 'No records yet'
  } else {
    // assigning places
    let i = 0
    records.map((el) => {
      el.place = i + 1 + '.'
      i++
    })

    const table = document.createElement('table')
    const headerRow = document.createElement('tr')
    const userHeader = document.createElement('th')
    userHeader.textContent = 'Name'
    const scoreHeader = document.createElement('th')
    scoreHeader.textContent = 'Time'
    const placeHeader = document.createElement('th')
    placeHeader.textContent = '#'
    headerRow.appendChild(placeHeader)
    headerRow.appendChild(userHeader)
    headerRow.appendChild(scoreHeader)
    table.appendChild(headerRow)

    if (Array.isArray(records)) {
      records.forEach((record) => {
        const row = document.createElement('tr')
        const userCell = document.createElement('td')
        userCell.textContent = record.username
        const scoreCell = document.createElement('td')
        scoreCell.textContent = record.score
        const placeCell = document.createElement('td')
        placeCell.textContent = record.place
        row.appendChild(placeCell)
        row.appendChild(userCell)
        row.appendChild(scoreCell)
        table.appendChild(row)
      })
    }

    tableContainer.appendChild(table)
  }
}

// record a new result and help to keep no more than "howManyPlaces" in the db
async function recordTheBestGlobal(howManyPlaces) {
  const userName = document.getElementById('user-name').value
  // add new record
  createScore(howManyNumbers, finishTimeSec, userName, firestore)
  const allSortedRecords = await getRating(0)
  if (allSortedRecords.length > howManyPlaces) {
    console.log(
      'oops.. more than ' +
        howManyPlaces +
        ' records in database, we need to delete some'
    )

    const recordsToKeep = await getRating(howManyPlaces)
    await deleteAllRecordsExcept(recordsToKeep, howManyNumbers, firestore)
  }
  hideWin()
}

//--- IMPORTS FOR GLOBAL LEADERBOARD ---//

import {
  createScore,
  getAllRecords,
  deleteAllRecordsExcept,
} from './firebase/ns-leaderboard-helper.js'

import { firestore } from './firebase/config.js'

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

// random element from array
function getRandomElement(array) {
  let randomEl = array[Math.floor(Math.random() * array.length)]
  return randomEl
}

// generate random color
// function randomColor(elem) {
//   let someColor = Math.floor(Math.random() * 16777215).toString(16)
//   elem.style.color = '#' + someColor
// }

// generate random color which is not close to white (thanks to GPT)
function randomColor(elem) {
  const minDistance = 50 // Adjust this value to control the minimum RGB distance from white
  let someColor
  do {
    someColor = Math.floor(Math.random() * 16777215).toString(16)
  } while (isColorTooCloseToWhite(someColor, minDistance))

  elem.style.color = '#' + someColor
}

function isColorTooCloseToWhite(color, minDistance) {
  // Convert the color to RGB values
  const red = parseInt(color.substr(0, 2), 16)
  const green = parseInt(color.substr(2, 2), 16)
  const blue = parseInt(color.substr(4, 2), 16)

  // Calculate the Euclidean distance between the color and white (255, 255, 255)
  const distance = Math.sqrt(
    Math.pow(255 - red, 2) + Math.pow(255 - green, 2) + Math.pow(255 - blue, 2)
  )

  // Check if the distance is less than the minimum distance
  return distance < minDistance
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

// get number from the input
function getNumberOfNumbers() {
  return Number(document.getElementById('input-how-many-numbers').value)
}

//----- INITIAL SETTINGS ----//

document.getElementById('leaderboard').innerHTML = ''
let finishTimeSec = 0
generateGameField(getNumberOfNumbers())
document.getElementById('is-shaking').addEventListener('change', function () {
  console.log(
    document.getElementById('is-shaking'),
    document.getElementById('is-rotate')
  )
  document.getElementById('is-rotate').disabled =
    document.getElementById('is-shaking').checked
})
//generatePhrase('HELLO', 'test-location')

//----- GAME FIELD ----//

async function generateGameField(numberOfnumbers) {
  document.getElementById('game-field').innerHTML = ''
  if (numberOfnumbers === 0) {
    // generatePhrase('choose the number', 'game-field')
    document.getElementById('game-field').innerHTML =
      '<div id="choose-first">Choose a number first</div>'
  }
  // local records (hidden for now)
  //document.getElementById('records').innerHTML = ''
  //showRecord()
  document.getElementById('leaderboard').innerHTML =
    '<div id="loader" class="loader"></div>'

  await displayRatingOnPage(5, 'leaderboard')
  let arr = getArray(1, numberOfnumbers)
  let i = numberOfnumbers
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
    //  onClick function only if the number is 1
    if (randomNum === 1) {
      newDiv.onclick = clickOnNumber
    }
    document.getElementById('game-field').appendChild(newDiv)
    if (document.getElementById('is-shaking').checked) {
      shakeIt()
    }
  }
}

// generate phrase, letter by letter
function generatePhrase(phrase, location) {
  console.log('starting phrase....')
  console.log('phrase and location', phrase, location)
  let arr = phrase.split('')
  let locationDiv = document.getElementById(location)
  let newDiv
  for (let i = 0; i < arr.length; i++) {
    newDiv = document.createElement('div')
    newDiv.setAttribute('class', 'num-div')
    newDiv.textContent = arr[i]
    assignStyle(newDiv)
    randomRotate(newDiv)
    locationDiv.appendChild(newDiv)
    shakeIt()
  }
  console.log(arr)
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
    // record result to the local storage (hidden for now)
    // recordTheBest(finishTimeSec)
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
  const numberOfnumbers = getNumberOfNumbers()
  let oldRecord = JSON.parse(
    localStorage.getItem(`bestRecordfor${numberOfnumbers}`)
  )
  let newResult = {
    howManyNumbers: numberOfnumbers,
    timeInSeconds: finishTimeSec,
  }

  if (oldRecord) {
    if (
      oldRecord.timeInSeconds > newResult.timeInSeconds ||
      oldRecord === undefined
    ) {
      localStorage.setItem(
        `bestRecordfor${numberOfnumbers}`,
        JSON.stringify(newResult)
      )
      document.getElementById('new-record').innerHTML = 'It is a new record!'
    }
  } else {
    localStorage.setItem(
      `bestRecordfor${numberOfnumbers}`,
      JSON.stringify(newResult)
    )
    document.getElementById('new-record').innerHTML = 'It is a new record!'
  }
}

// show local record for the current number (hidden for now)
function showRecord() {
  const numberOfnumbers = getNumberOfNumbers()
  document.getElementById('reset-records').style.visibility = 'hidden'
  let oldRecord = JSON.parse(
    localStorage.getItem(`bestRecordfor${numberOfnumbers}`)
  )
  if (oldRecord) {
    let result = `Best time for  ${numberOfnumbers} numbers is ${oldRecord.timeInSeconds} seconds`
    document.getElementById('records').innerHTML = result
    document.getElementById('reset-records').style.visibility = 'visible'
  } else {
    document.getElementById('reset-records').style.visibility = 'hidden'
  }
}

// reset local records button (hidden for now)
//document.getElementById('reset-records').onclick = resetRecords

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
document
  .getElementById('input-how-many-numbers')
  .addEventListener('input', handleHowMany)

function handleHowMany() {
  const numberOfnumbers = getNumberOfNumbers()
  if (numberOfnumbers == 0) {
    document.getElementById('game-field').innerHTML =
      'Choose a number between 2 and 80'
  }
  // input validation
  const regex = /^(?:[1-7]?[0-9]|80)$/
  if (regex.test(numberOfnumbers)) {
    document.getElementById('validation-message').textContent = ''
    generateGameField(numberOfnumbers)
  } else {
    document.getElementById('validation-message').textContent =
      'You can only input numbers between 1 and 80.'
    return
  }
}

//--- START NEW GAME ---//
document.getElementById('start-over').onclick = startOver
document.getElementById('close-button').onclick = hideWin

function startOver() {
  const numberOfnumbers = getNumberOfNumbers()
  gtm = 0
  nextDivID = '1n'
  document.getElementById('timer-span').innerHTML = '0'
  document.getElementById('click-next-spn').innerHTML = '1'
  clearInterval(gameTime)
  generateGameField(numberOfnumbers)
  document.getElementById('input-how-many-numbers').disabled = false
  if (document.getElementById('game-field').style.filter) {
    hideWin()
  }
  // show local records (hidden for now)
  // showRecord()
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
  document.getElementById('name-error-message').innerHTML = ''
  displayRatingOnPage(5, 'leaderboard')
  startOver()
}

document.getElementById('close-button').onclick = hideWin

//--- GLOBAL LEADERBOARD  WITH FIREBASE ---//

// save the result to the data base after finishing the game
document.getElementById('save-game-data').onclick = () =>
  recordTheBestGlobal(30) // <--how many records to keep in db for each number

// show current rating till place in parameter
async function getRating(place) {
  let numberOfnumbers = getNumberOfNumbers()
  let records = await getAllRecords(numberOfnumbers, firestore)
  const sortedRecords = records.sort(
    (a, b) => parseFloat(a.score) - parseFloat(b.score)
  )
  if (place == 0) {
    return sortedRecords
  } else {
    return sortedRecords.slice(0, place)
  }
}

async function displayRatingOnPage(places, location) {
  const tableContainer = document.getElementById(location)
  const records = await getRating(places)

  if (records.length === 0) {
    tableContainer.innerHTML = 'No records yet'
  } else {
    tableContainer.innerHTML = ''

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
      records.forEach((record, index) => {
        const row = document.createElement('tr')
        const userCell = document.createElement('td')
        userCell.textContent =
          record.username.length > 10
            ? record.username.substring(0, 10) + '...'
            : record.username
        const scoreCell = document.createElement('td')
        scoreCell.textContent = record.score
        const placeCell = document.createElement('td')
        placeCell.textContent = record.place

        row.appendChild(placeCell)
        row.appendChild(userCell)
        row.appendChild(scoreCell)
        table.appendChild(row)

        // Apply alternate background color
        if (index % 2 === 1) {
          row.style.backgroundColor = '#9b3455' // Darker background color
        }
      })
    }

    const header = document.createElement('p')
    header.innerHTML =
      'Leaderboard for number <b>' + getNumberOfNumbers() + '</b>'
    header.setAttribute('id', 'leaderboard-header')

    tableContainer.appendChild(header)
    tableContainer.appendChild(table)
  }
}

// record a new result and  keep no more than "howManyPlaces" records in the db
async function recordTheBestGlobal(howManyRecordsToKeep) {
  const userName = document.getElementById('user-name').value
  const numberOfnumbers = getNumberOfNumbers()
  if (userName.length > 14) {
    // Display an error message or handle the case where the name is too long
    document.getElementById(
      'name-error-message'
    ).innerHTML = `Name must be  no longer than 14 characters (currently ${userName.length})`
    return
  }
  // add new record to the database
  createScore(numberOfnumbers, finishTimeSec, userName, firestore)
  // get all records from db
  const allSortedRecords = await getRating(0)
  if (allSortedRecords.length > howManyRecordsToKeep) {
    const recordsToKeep = await getRating(howManyRecordsToKeep)
    await deleteAllRecordsExcept(recordsToKeep, numberOfnumbers, firestore)
  }
  hideWin()
}

//--- BUTTONS WITH NUMBERS ---//

function createNumberButtons() {
  const numbers = [10, 20, 30, 40, 50, 60, 70, 80]

  // get the container element where the buttons will be placed
  const container = document.getElementById('button-number-container')

  // create buttons dynamically
  numbers.forEach(function (number) {
    var button = document.createElement('button')
    button.textContent = number
    button.classList.add('small-button')
    button.addEventListener('click', function () {
      document.getElementById('input-how-many-numbers').value = number
      generateGameField(number)
    })
    container.appendChild(button)
  })
}

createNumberButtons()

//--- LEADERBOARD WINDOW ---//

document.getElementById('leaderboard').onclick = showFullLeaderboard
document.getElementById('close-leaderboard').onclick = hideFullLeaderboard
document.getElementById('close-leaderboard-button').onclick =
  hideFullLeaderboard

function hideFullLeaderboard() {
  document.getElementById('leaderboard-window').style.visibility = 'hidden'
  document.getElementById('game-field').style.filter = 'none'
  document.getElementById('info').style.filter = 'none'
  document.getElementById('leaderboard-window').style.animation = ''
  document.getElementById('full-leaderboard').innerHTML =
    '<div id="loader" class="loader"></div>'
}

async function showFullLeaderboard() {
  document.getElementById('game-field').style.filter = 'blur(5px)'
  document.getElementById('info').style.filter = 'blur(5px)'
  document.getElementById('leaderboard-window').style.animation = 'winPopUp 1s'
  document.getElementById('leaderboard-window').style.visibility = 'visible'
  const numberOfnumbers = getNumberOfNumbers()
  const fullLeaderboard = await getRating(30)
  //'<div id="loader" class="loader"></div>'
  displayRatingOnPage(30, 'full-leaderboard')
}

//--- LOADER ---//

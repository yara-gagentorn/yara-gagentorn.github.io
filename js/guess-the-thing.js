// take a guess and compare it with the right answer
// if partly right - reply with ""

const guess = document.getElementById('my-guess')
const wrongAnswer = [
  'Oops! Wrong answer :(',
  'Try again!',
  'Nope. Try google it',
  'No. Hint: try to sing the elements of the array.',
  'Try one more time!',
  'Nope, but you will get it!',
  "No, you've got it wrong.",
]

const almostRightAnswer = [
  'paper packages',
  'brown package',
  'package with string',
  'package with strings',
  'package',
  'strings',
  'string',
]

const fullRightAnswer = 'brown paper packages tied up with strings'

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function checkTheGuess() {
  let guessStr = guess.value

  let reply = ''
  if (guessStr.toUpperCase() === fullRightAnswer.toUpperCase()) {
    reply = 'WoW! That is a full answer!'
  } else {
    almostRightAnswer.forEach((element) => {
      if (element.toUpperCase() === guessStr.toUpperCase()) {
        reply = 'You are almost right!'
      } else {
        reply = getRandomElement(wrongAnswer)
      }
    })
  }

  document.getElementById('reply').innerHTML = reply
}

document.getElementById('try-to-guess').onclick = checkTheGuess

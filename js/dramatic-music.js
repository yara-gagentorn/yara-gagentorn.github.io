// credit for the code: Brendan Jarvis

function playDramaticMusic() {
  var audio = new Audio('../media/dramatic-music.mp3')
  audio.play()
}

document
  .getElementById('dramaticMusic')
  .addEventListener('click', playDramaticMusic)

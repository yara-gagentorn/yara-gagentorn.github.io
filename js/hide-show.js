//show element by id
function showText(idText, idButton) {
  let isVisible = document.getElementById(idText).style.display === 'none'
  console.log(
    'first click',
    document.getElementById(idText).style.display,
    isVisible
  )
  if (isVisible) {
    document.getElementById(idText).style.display = 'block'
    document.getElementById(idButton).innerHTML = 'hide description'
  } else {
    document.getElementById(idText).style.display = 'none'
    document.getElementById(idButton).innerHTML = 'show description'
  }
}

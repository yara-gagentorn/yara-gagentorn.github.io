//show element by id
let flag = true //needs to be fixed (use check visibility in))

function showText(idText, idButton) {
  if (document.getElementById(idText).style.display === 'none') {
    document.getElementById(idText).style.display = 'block'
    document.getElementById(idButton).innerHTML = 'hide description'
  } else {
    document.getElementById(idText).style.display = 'none'
    document.getElementById(idButton).innerHTML = 'show description'
  }
}

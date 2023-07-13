// function toggleMenu() {
//   var menu = document.getElementById('menu')
//   if (menu.style.display === 'none') {
//     menu.style.display = 'block' // Show the menu
//     menu.classList.toggle('show')
//   } else {
//     menu.classList.toggle('show')

//     menu.style.display = 'none' // Hide the menu
//   }
// }

function toggleMenu(){
  var menu = document.getElementById('menu')
  if (menu.classList.contains("menu-open")){
    menu.classList.remove("menu-open")
  } else {
    menu.classList.add("menu-open")
  }

}
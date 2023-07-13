
function toggleMenu(){
  var menu = document.getElementById('menu')
  if (menu.classList.contains("menu-open")){
    menu.classList.remove("menu-open")
  } else {
    menu.classList.add("menu-open")
  }

}
// made with chat GPT

let stickyElement = document.getElementById('header')
let isSticky = false

let menuHeader = document.getElementById('menu-header')
let smallLogo = document.getElementById('small-logo')

window.addEventListener('scroll', function () {
  var rect = stickyElement.getBoundingClientRect()
  var offsetTop = rect.top

  if (offsetTop <= 20 && !isSticky) {
    // The sticky element has become sticky 'rgba(116, 62, 106,0.8)'
    //menuHeader.classList.add('header-anim') #663A85

    stickyElement.style.backgroundColor = '#663A85'
    stickyElement.style.backgroundImage =
      ' background-image: linear-gradient(to right, #453a94, #f43b47)'
    stickyElement.style.backgroundSize = 'background-size: cover;'
    menuHeader.style.left = '29%'
    smallLogo.style.opacity = '100%'

    isSticky = true
  } else if (offsetTop > 20 && isSticky) {
    // The sticky element is no longer sticky
    stickyElement.style.backgroundColor = 'rgba(255, 189, 211, 0.05)'
    menuHeader.style.left = '5%'
    smallLogo.style.opacity = '0'

    isSticky = false
  }
})

//---BURGER MENU----//
const menu = document.getElementById('menu-toggle')
menu.addEventListener('click', function () {
  document
    .getElementsByClassName(menu - toggle - bar)
    .classList.toggle('nav-open')
})

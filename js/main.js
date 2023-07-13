// made with chat GPT

let stickyElement = document.getElementById('header')
let isSticky = false

let menuHeader = document.getElementById('menu-header')
let smallLogo = document.getElementById('small-logo')

window.addEventListener('scroll', function () {
  var rect = stickyElement.getBoundingClientRect()
  var offsetTop = rect.top

  if (offsetTop <= 20 && !isSticky) {
    // The sticky element is sticky
    menuHeader.classList.add('menu-header-is-sticky')

    smallLogo.style.opacity = '100%'
    // smallLogo.style.width = '300px'
    stickyElement.classList.add('is-sticky')
    smallLogo.classList.add('logo-is-sticky')

    isSticky = true
  } else if (offsetTop > 20 && isSticky) {
    // The sticky element is no longer sticky
    smallLogo.style.opacity = '0'
    smallLogo.style.width = '0px'
    stickyElement.classList.remove('is-sticky')
    menuHeader.classList.remove('menu-header-is-sticky')

    smallLogo.classList.remove('logo-is-sticky')

    isSticky = false
  }
})

// function toggleModal() {
//   const modal = document.querySelector('.modal')
//   console.log(modal)
//   modal.classList.add('active')
// }

function toggleMenu() {
  if (stickyElement.classList.contains('open-menu')) {
    console.log('hereeeee')
    stickyElement.classList.remove('open-menu')
    open=false
  } else {
    console.log('thereeeee')

    stickyElement.classList.add('open-menu')
  }
}

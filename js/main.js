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
    smallLogo.style.visibility = 'visible'
    smallLogo.style.opacity = '100%'
    stickyElement.classList.add('is-sticky')
    // smallLogo.classList.add('logo-is-sticky')

    isSticky = true
  } else if (offsetTop > 20 && isSticky) {
    // The sticky element is no longer sticky
    smallLogo.style.visibility = 'hidden'
    smallLogo.style.opacity = '0'
    stickyElement.classList.remove('is-sticky')
    // smallLogo.classList.remove('logo-is-sticky')

    isSticky = false
  }
})

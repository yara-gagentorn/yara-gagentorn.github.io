// made with chat GPT

let stickyElement = document.getElementById('header')
let isSticky = false

let menuHeader = document.getElementById('menu-header')
let smallLogo = document.getElementById('small-logo')

window.addEventListener('scroll', function () {
  var rect = stickyElement.getBoundingClientRect()
  var offsetTop = rect.top

  if (offsetTop <= 20 && !isSticky) {
    stickyElement.classList.add('is-sticky')
    smallLogo.classList.add('logo-is-sticky')
    // menuHeader.style.left = '25%'

    // smallLogo.style.opacity = '100%'
    // smallLogo.style.display = 'inline-block'

    isSticky = true
  } else if (offsetTop > 20 && isSticky) {
    // The sticky element is no longer sticky
    stickyElement.classList.remove('is-sticky')
    smallLogo.classList.remove('logo-is-sticky')

    // menuHeader.style.left = '0'

    // smallLogo.style.opacity = '0'
    // smallLogo.style.display = 'none'

    isSticky = false
  }
})

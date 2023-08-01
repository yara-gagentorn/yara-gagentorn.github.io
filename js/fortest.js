function toggleMenu() {
  let menu = document.getElementById('menu')
  let checkbox = document.getElementById('menu-checkbox')

  if (menu.classList.contains('menu-open')) {
    menu.classList.remove('menu-open')
    checkbox.checked = false
  } else {
    menu.classList.add('menu-open')
    checkbox.checked = true
  }
}

// in the viewport?
function isElementInViewport(element) {
  var rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// for sticky header
let desktopLogo = document.querySelector('.desktop-logo')
let desktopStickyElement = document.getElementsByClassName('desktop-menu')[0]
let stickyElement = document.getElementById('mobile-header')
let isSticky = false
let mobileLogoCell = document.getElementById('mobile-logo-cell')
let animationDivs = document.querySelectorAll('.animation-div')
const logoHeight = desktopLogo.getBoundingClientRect().height //calculate the height of the logo, it will depend on screen size

window.addEventListener('scroll', function () {
  let scrollY = window.scrollY
  if (scrollY > 0 && !isSticky) {
    // The sticky element is sticky
    console.log('Stickyyyyy!!!', logoHeight)
    desktopLogo.style.height = '0px'
    desktopStickyElement.classList.add('desktop-header-is-sticky')
    stickyElement.classList.add('mobile-header-is-sticky')
    mobileLogoCell.classList.add('small-logo-cell-is-sticky')
    isSticky = true
  } else if (scrollY === 0 && isSticky) {
    // The sticky element is no longer sticky
    desktopStickyElement.classList.remove('desktop-header-is-sticky')
    desktopLogo.style.height = `${logoHeight}px`

    stickyElement.classList.remove('mobile-header-is-sticky')
    mobileLogoCell.classList.remove('small-logo-cell-is-sticky')
    isSticky = false
  }

  // trying to make every div appear smoooooothly when in the vewport
  animationDivs.forEach(function (div) {
    if (isElementInViewport(div)) {
      div.classList.add('animation-div-fade-in')
    }
  })
})

window.onload = function () {
  desktopLogo.style.height = `${logoHeight}px` // this way the transition for height on scrolling works from the first scroll
  animationDivs.forEach(function (div) {
    // show visible divs straight away
    if (isElementInViewport(div)) {
      div.classList.add('animation-div-fade-in')
    }
  })
}

// for sticky header on desktop

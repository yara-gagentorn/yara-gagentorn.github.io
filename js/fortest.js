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
let stickyElement = document.getElementById('mobile-header')
let isSticky = false
let mobileLogoCell = document.getElementById('mobile-logo-cell')
let animationDivs = document.querySelectorAll('.animation-div')

window.addEventListener('scroll', function () {
  let scrollY = window.scrollY
  if (scrollY > 0 && !isSticky) {
    // The sticky element is sticky
    stickyElement.classList.add('mobile-header-is-sticky')
    mobileLogoCell.classList.add('small-logo-cell-is-sticky')
    isSticky = true
  } else if (scrollY === 0 && isSticky) {
    // The sticky element is no longer sticky
    stickyElement.classList.remove('mobile-header-is-sticky')
    mobileLogoCell.classList.remove('small-logo-cell-is-sticky')
    isSticky = false
  }

  // trying to make every div smoooooothly when in the vewport, it doesn't work so far
  animationDivs.forEach(function (div) {
    if (isElementInViewport(div)) {
      div.classList.add('animation-div-fade-in')
    }
  })
})

window.onload = function () {
  animationDivs.forEach(function (div) {
    if (isElementInViewport(div)) {
      div.classList.add('animation-div-fade-in')
    }
  })
}

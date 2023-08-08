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

// for sticky header, such a mess, but at least it is working
let desktopStickyElement = document.getElementsByClassName('desktop-menu')[0]
let stickyElement = document.getElementById('mobile-header')
let isSticky = false
let mobileLogoCell = document.getElementById('mobile-logo-cell')
let animationDivs = document.querySelectorAll('.animation-div')
let desktopNav = document.getElementById('desktop-nav')
const desktopLogo = document.getElementById('desktop-logo-header')
const desktopLogoHeight = desktopLogo.height

window.addEventListener('scroll', function () {
  let scrollY = window.scrollY
  if (scrollY > 0 && !isSticky) {
    // The sticky element is sticky
    desktopLogo.style.height = '0px'
    document.querySelector('.desktop-logo').height = 0
    desktopStickyElement.classList.add('desktop-header-is-sticky')
    stickyElement.classList.add('mobile-header-is-sticky')
    mobileLogoCell.classList.add('small-logo-cell-is-sticky')
    isSticky = true
  } else if (scrollY === 0 && isSticky) {
    // The sticky element is no longer sticky
    desktopStickyElement.classList.remove('desktop-header-is-sticky')
    desktopLogo.style.height = `${desktopLogoHeight}px`
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
  animationDivs.forEach(function (div) {
    // show visible divs straight away
    if (isElementInViewport(div)) {
      div.classList.add('animation-div-fade-in')
    }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  let desktopLogo = document.getElementById('desktop-logo-header')
  const logoHeight = desktopLogo.clientHeight
  if (desktopLogo.complete) {
  } else {
    // The image is not loaded yet, add a load event listener
    desktopLogo.addEventListener('load', function () {
      const logoHeight = desktopLogo.clientHeight
      desktopLogo.height = logoHeight
    })
  }

  //----SHINE TEST----//
  const navLinks = document.querySelectorAll('nav a')

  navLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault()
      console.log('smth')
      const targetId = link.getAttribute('href').replace('-link', '')
      const targetSection = document.querySelector(targetId)
      console.log(targetId, targetSection)
      targetSection.classList.add('glow')

      setTimeout(() => {
        targetSection.classList.remove('glow')
      }, 1000) // Adjust the time to match the animation duration

      targetSection.scrollIntoView({ behavior: 'smooth' })
    })
  })
  //----END OF SHINE TEST----//
})

// Get all the elements with class "project-descr"
const projectDescrElements = document.querySelectorAll('.project-descr')

// Function to toggle the visibility of full description
function toggleFullDescription(event) {
  const projectDescr = event.currentTarget.previousElementSibling
  projectDescr.classList.toggle('expanded')
  const buttonText = projectDescr.classList.contains('expanded')
    ? 'Show Less'
    : 'Show More'
  event.currentTarget.textContent = buttonText

  // Wait for the transition to finish before setting the max-height to accommodate the full content
  setTimeout(() => {
    if (projectDescr.classList.contains('expanded')) {
      projectDescr.style.maxHeight = projectDescr.scrollHeight + 'px'
    } else {
      projectDescr.style.maxHeight = '507px'
    }
  }, 10)
}

// Attach the click event to each "Show More" button
const toggleButtons = document.querySelectorAll('.toggle-button')
toggleButtons.forEach((button) => {
  button.addEventListener('click', toggleFullDescription)
})

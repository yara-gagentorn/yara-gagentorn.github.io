// made with chat GPT

let stickyElement = document.getElementById('header')
let isSticky = false

let menuHeader = document.getElementById('menu-header')
let smallLogo = document.getElementById('small-logo')

window.addEventListener('scroll', function () {
  var rect = stickyElement.getBoundingClientRect()
  var offsetTop = rect.top

  if (offsetTop <= 20 && !isSticky) {
    // The sticky element has become sticky
    stickyElement.style.backgroundColor = '#8C417C'
    stickyElement.style.backgroundImage =
      ' background-image: linear-gradient(to right, #453a94, #f43b47)'
    stickyElement.style.backgroundSize = 'background-size: cover;'
    menuHeader.style.left = '25%'
    stickyElement.style.borderTopLeftRadius = '0'
    stickyElement.style.borderTopRightRadius = '0'
    stickyElement.style.boxShadow =
      'rgba(69, 58, 148, 0.17) 0px -23px 25px 0px inset, rgba(69, 58, 148, 0.15) 0px -36px 30px 0px inset, rgba(69, 58, 148, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
    smallLogo.style.opacity = '100%'
    smallLogo.style.display = 'inline-block'

    isSticky = true
  } else if (offsetTop > 20 && isSticky) {
    // The sticky element is no longer sticky
    stickyElement.style.backgroundColor = 'rgba(255, 189, 211, 0.05)'
    stickyElement.style.borderTopLeftRadius = 'var(--bradius)'
    stickyElement.style.borderTopRightRadius = 'var(--bradius)'
    stickyElement.style.boxShadow = 'none'
    menuHeader.style.left = '5%'
    
    smallLogo.style.opacity = '0'
    smallLogo.style.display = 'none'


    isSticky = false
  }
})

//---BURGER MENU----//

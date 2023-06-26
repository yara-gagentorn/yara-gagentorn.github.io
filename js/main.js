// made with chat GPT

let stickyElement = document.getElementById('header')
let isSticky = false

window.addEventListener('scroll', function () {
  var rect = stickyElement.getBoundingClientRect()
  var offsetTop = rect.top

  if (offsetTop <= 20 && !isSticky) {
    // The sticky element has become sticky

    stickyElement.style.backgroundColor = 'rgba(116, 62, 106,0.8)'
    stickyElement.style.textAlign = 'right'

    isSticky = true
    console.log('Sticky element is at the top position of 20px')
  } else if (offsetTop > 20 && isSticky) {
    // The sticky element is no longer sticky
    stickyElement.style.backgroundColor = 'rgba(255, 189, 211, 0.05)'
    stickyElement.style.textAlign = 'center'

    isSticky = false
  }
})

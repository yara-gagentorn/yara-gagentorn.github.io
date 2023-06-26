window.addEventListener('scroll', function () {
  var logo = document.getElementById('logo')
  var largeLogo = document.getElementById('largeLogo')
  var smallLogo = document.getElementById('smallLogo')

  if (window.scrollY > 0) {
    logo.style.height = '50px' // Adjust this value to match smallLogo height
    smallLogo.style.opacity = '1'
    largeLogo.style.opacity = '0'
  } else {
    logo.style.height = '100px' // Adjust this value to match largeLogo height
    smallLogo.style.opacity = '0'
    largeLogo.style.opacity = '1'
  }
})

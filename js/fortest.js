document.addEventListener('DOMContentLoaded', () => {
  // Number of divs to create
  const numberOfDivs = 20

  // Create the divs
  for (let i = 0; i < numberOfDivs; i++) {
    const div = document.createElement('div')
    div.className = 'div-box'

    // Generate random phrases for the header
    const headerPhrases = generateHeaderPhrases()

    const header = document.createElement('h2')
    header.textContent = headerPhrases.join(' ')

    // Generate short text about Yara
    const text = generateDescription()

    const paragraph = document.createElement('p')
    paragraph.textContent = text

    div.appendChild(header)
    div.appendChild(paragraph)

    // Assign different classes to each div for custom animation
    if (i % 3 === 0) {
      div.classList.add('div-box-1')
    } else if (i % 3 === 1) {
      div.classList.add('div-box-2')
    } else {
      div.classList.add('div-box-3')
    }

    document.querySelector('.container').appendChild(div)
  }

  // Helper function to generate short descriptions
  function generateDescription() {
    const descriptions = [
      // Descriptions here...
    ]

    return descriptions[Math.floor(Math.random() * descriptions.length)]
  }

  // Helper function to generate random phrases for headers
  function generateHeaderPhrases() {
    const phrases = [
      'Yara is amazing',
      'Incredible Yara',
      'Yara, the best',
      'Simply the best',
      'Yara is awesome',
      'The greatness of Yara',
    ]

    const numberOfPhrases = Math.floor(Math.random() * 3) + 2 // Generate 2-4 word phrases
    const selectedPhrases = []

    for (let i = 0; i < numberOfPhrases; i++) {
      const phraseIndex = Math.floor(Math.random() * phrases.length)
      selectedPhrases.push(phrases[phraseIndex])
    }

    return selectedPhrases
  }
})

// read the input
// check the imput symbol by symbol
// < - means tag is starting, need to change it to <span class="user-class-name-1">&amp;lt;</span><span class="user-class-name-2">
// > - means tag is finished, needs to change it to </span><span class="user-class-name-1"> > </span>
//display the text in the textarea

const myHTML = document.getElementById('html-code')
const class1 = document.getElementById('class-for-tag-1').value
const class2 = document.getElementById('class-for-tag-2').value

function htmlToCode(myHTML, class1, class2) {
  let myHTMLstr = myHTML.value
  let myCode = ''
  let openTag =
    '&lt;span class="' +
    class1 +
    '"&gt;&amp;lt;&lt;/span&gt;&lt;span class="' +
    class2 +
    '"&gt;'
  let closeTag = '</span><span class="' + class1 + '">></span>'
  let openFancyBraket = '<span class=' + class1 + '>{</span>'
  let closeFancyBraket = '<span class=' + class1 + '>}</span>'
  let func = '<span class=' + class2 + '>function</span>'

  myCode = myHTMLstr
    .replaceAll(/</g, openTag)
    .replaceAll(/>/g, closeTag)
    .replaceAll(/{/g, openFancyBraket)
    .replaceAll(/}/g, closeFancyBraket)
    .replaceAll(/function/g, func)

  document.getElementById('final-code').innerHTML = myCode
}

// Copy function
function copyTextarea() {
  let copyText = document.getElementById('final-code').value
  navigator.clipboard.writeText(copyText)
}

// "Copy textarea" button
document.getElementById('copy-button').onclick = copyTextarea

// Assign function to a button

document.getElementById('html-to-code').onclick = () => {
  htmlToCode(myHTML, class1, class2)
}

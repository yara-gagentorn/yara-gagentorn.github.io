////// Creating colored HTML code for using in code demonstrations on webpages. //////

// -- take a standart HTML code as an input
// -- assign styles to symbols < > {}
// -- assign styles to tags names
// -- change < symbol to &lt; which let display tags without being interpreted by browser
// -- copy the output and use it inside your <code><pre></pre><code> tags (need to manually adjust indents)

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

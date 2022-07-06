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

  myCode = myHTMLstr.replaceAll(/</g, openTag).replaceAll(/>/g, closeTag)

  document.getElementById('final-code').innerHTML = myCode
  document.getElementById('demo').innerHTML = myCode.toString
}

document.getElementById('html-to-code').onclick = () => {
  htmlToCode(myHTML, class1, class2)
}

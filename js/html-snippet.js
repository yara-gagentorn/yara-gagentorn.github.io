// read the input
// check the imput symbol by symbol
// < - means tag is starting, need to change it to <span class="user-class-name-1">&lt;</span><span class="user-class-name-2">
// > - means tag is finished, needs to change it to </span><span class="user-class-name-1"> > </span>
//display the text in the textarea

const myHTML = document.getElementById('html-code')
const class1 = document.getElementById('class-for-tag-1')
const class2 = document.getElementById('class-for-tag-2')

function htmlToCode(myHTML) {
  let myHTMLstr = myHTML.value
  let myCode = ''

  for (let i = 0; i < myHTMLstr.length; i++) {
    if (myHTMLstr[i] == '<') {
      myCode = myCode.concat('OPen tag')
    } else if (myHTMLstr[i] == '>') {
      myCode = myCode.concat('Closing tag')
    } else myCode = myCode.concat(myHTMLstr[i])
  }

  document.getElementById('final-code').innerHTML = myCode
}

document.getElementById('html-to-code').onclick = htmlToCode.myHTML

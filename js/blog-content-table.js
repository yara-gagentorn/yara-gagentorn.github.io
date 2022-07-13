// Insert code for blog content table,
// so would not need to change every page manually
// when a new enty is added
// Takes a code which need to be inserted
// and a div ID where needs to be inserted
// as an input

const myCurrentPageAddress = window.location.href
const isIndex = myCurrentPageAddress.includes('index')
const isRoot = location.pathname == '/'

// here is HTML code for the menu
const myBlogContentTable =
  '<h3>my blog</h3>' +
  '<ul id="blog-links">' +
  '<li class="blog-links-el tech-blog"><a href="./1-class-vs-id.html">Classes vs IDs</a></li>' +
  '<li class="blog-links-el core-blog"><a href="./2-identity-and-value.html">Identity and Values</a></li>' +
  '<li class="blog-links-el core-blog"><a href="./3-learning-plan.html">Learning plan</a></li>' +
  '<li class="blog-links-el tech-blog"><a href="./4-javascript-dom.html">JS and DOM</a></li>' +
  '<li class="blog-links-el core-blog"><a href="./5-emotional-intelligence.html">IQ and EQ</a></li>' +
  '<li class="blog-links-el tech-blog"><a href="./6-problem-solving.html">Problem Solving</a></li>' +
  '<li class="blog-links-el core-blog"><a href="./7-neuroplasticity.html">Neuroplasticity</a></li>' +
  '</ul>'

// links for main page are different
function fixLink(BlogContentTable) {
  return BlogContentTable.replaceAll(/\.\//g, './blog/')
}

const myBlogContentTableForIndex = fixLink(myBlogContentTable)

const myDIVid = 'blog' // id of DIV where to insert
const myCurrentItem = document
  .getElementsByTagName('title')
  .item(0)
  .innerHTML.toString() // title is the same as a name of current item

function insertBlogContentTable(HTMLcode, divID) {
  document.getElementById(divID).innerHTML = HTMLcode
}

insertBlogContentTable(myBlogContentTable, myDIVid)

const allLinks = Array.from(document.querySelectorAll('a'))

// after inserting the menu, find the current item (the title of the page)
// NOTE: title of the page must me the same as name of the current item in menu

function markCurrentItem(titleName) {
  // find the element which content is the same as title
  let currentItem = allLinks.find((el) => {
    return el.textContent.toLowerCase().includes(titleName.toLowerCase())
  })
  // the parent of this element needs to have id='blog-current-item'
  currentItem.parentElement.setAttribute('id', 'blog-current-item')
}

// no current item on the or root index page
if (!isIndex && !isRoot) {
  markCurrentItem(myCurrentItem)
} else {
  insertBlogContentTable(myBlogContentTableForIndex, myDIVid)
}

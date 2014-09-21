// main application scripts
// one.js consuming code here

$(function() {

var HTML = One.HTML,
  CSS = One.CSS;

HTML.init({
  'h1.header.large': 'Hi there',
  'p#custom-subtext': 'Some sub-text',
  div: {
    h3: 'Headline in a div',
    div: {
      p: [
        'Nested text in a div',
        'Another paragraph in the same div'
      ]
    }
  },
  ul: {
    'li.styled-items': ['item one', 'item two']
  }
});

CSS.init({
  h1: {
    color: 'red',
    padding: '5px'
  },
  '.header': {
    'font-size': '20px'
  },
  '#custom-subtext': {
    'text-decoration': 'underline'
  },
  li: {
    'list-style': 'none',
  }
});


});

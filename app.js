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
    'li.styled-item': ['item one', 'item two']
  }
});

var styleSheet = new CSS.StyleSheet('main');

styleSheet.defineStyles({
  h1: {
    color: 'red',
    padding: '5px',
    border: '1px solid black'
  },
  '.header': {
    'font-size': '20px'
  },
  '#custom-subtext': {
    'text-decoration': 'underline'
  },
  li: {
    'list-style': 'none',
    'background-color': 'green'
  }
});

var style = styleSheet.getStyle('li');

style.update({color: 'white', 'background-color': '#ccc'});

var anotherStyle = new CSS.Style('p', {color: 'green'});

styleSheet.addStyle(anotherStyle);
});

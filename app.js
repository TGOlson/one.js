// main application scripts
// one.js consuming code here

$(function() {

One.HTML.init({
  h1: 'Hi there',
  p: 'Some sub-text',
  div: {
    h3: 'Headline in a div',
    p: 'Text in a div',
    div: {
      p: [
        'Nested text in a div',
        'Another paragraph in the same div'
      ]
    }
  },
  ul: {
    li: ['item one', 'item two']
  }
});

// One.style({
//   h1: {
//     color: 'red',
//     padding: '5px'
//   },
//   li: {
//     list-style: none;
//   }
// });


});

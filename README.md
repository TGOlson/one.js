# one.js

Spike on single-language client-side applications. Write all markup and styles in JavaScript.

**Note: Development on the JavaScript style module and compiler in continuing at [csjs](http://github.com/tgolson/csjs). Check out that project for a usable JavaScript-to-styles library.**

## HTML as JavaScript

Write markup in JavaScript object format.

```js
var HTML = One.HTML;

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
```

Gets directly compiled to HTML

```html
<body>
  <h1 class="header large">Hi there</h1>
  <p id="custom-subtext">Some sub-text</p>
  <div>
    <h3>Headline in a div</h3>
    <div>
      <p>Nested text in a div</p>
      <p>Another paragraph in the same div</p>
    </div>
  </div>
  <ul>
    <li class="styled-item">item one</li>
    <li class="styled-item">item two</li>
  </ul>
</body>
```

Note: to avoid duplicate keys, use array syntax or the name modifier `(<arbitrary-unique-content>)`. Anything inside of the parenthesis will be removed, and provides a strategy for avoiding duplicate keys.

```js
var section = {
  'p(1)': 'some text',
  'p(2)': 'more text',
  'p(3)': 'even more'
};
```

## CSS as JavaScript

Write styles in JavaScript object format.

```js
var CSS = One.CSS,
  styleSheet = new CSS.StyleSheet('main', {
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
```

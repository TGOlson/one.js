# one.js

Write HTML in JavaScript. Write CSS in JavaScript. Write JavaScript in JavaScript.

Framework for single language client side applications.

## About

`one.js` allows developers to write entire client side applications using only one language - JavaScript. This helps reduce cognitive overhead, and produces a much more programmatic way of writing style and markup.

Do wild things like passing style objects around, modifying them dynamically. Or creating markup templates in a concise, explicit manner.

Lots of inspiration taken from [React](http://facebook.github.io/react/), as well many of the excellent templating libraries and JavaScript frameworks.

## Usage

* Create an `index.html` file, importing `jQuery`, `one.js` and any other JavaScript files. Note: `jQuery` needs to be loaded before `one.js` can run.
* Write an entire client side application in JavaScript.

## HTML as JavaScript

**note, HTML development is currently on hold**

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

Note: to avoid duplicate keys, use array syntax, templates, or use the name modifier `(...)`. Anything inside of the parenthesis will be removed, and provides a strategy for avoiding duplicate keys

```js
var section = {
  'p(1)': 'some text',
  'p(2)': 'more text',
  'p(3)': 'even more'
};
```

## CSS as JavaScript

Write styles in JavaScript

```js
var CSS = One.CSS,

  // style definition object
  styles{
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
  },

  styleSheet = new CSS.StyleSheet('main', styles);
```

Gets compiled directly to CSS

```css
h1 {
  color: red;
  padding: 5px;
  border: 1px solid black;
}

.header {
  font-size: 20px;
}

#custom-subtext {
  text-decoration: underline;
}

li {
  list-style: none;
  background-color: green;
}
```

* Programmatically add styles

```js
var CSS = One.CSS,
  styleSheet = CSS.getStyleSheet('main');

styleSheet.addStyle('p', {color: 'purple'});
// => [object Style]
```

The current style-sheet will now include the defined style `p {color: purple;}`.

* Edit previous styles

```js
// styleSheet variable from previous example
styleSheet.update('p', {color: 'green'});
// => [object Style]
```

Now the original style is updated `p {color: green;}`.

* Interact with style objects

```js
// styleSheet variable from previous example
var style = styleSheet.getStyle('p');

style.toCSS();
// "p {
//   color: green;
// }"

style.update({'background-color:' 'yellow'});
// => [object Style]

style.toCSS();
// "p {
//   color: green;
//   background-color: yellow;
// }"

style.getValue('color');
// => 'green'
```

* Auto-compilation

The above examples work by leveraging auto compilation. However, if this is undesirable, it can be toggled off in one of two ways:

```js
// set default auto-compilation for style-sheets
// note: this must be set before any style-sheets are created
// any style-sheet created before updating this property will not be affected
One.CSS.autoCompile = false;

// or, directly set auto-compilation for specific style-sheets
// this can be done at any time, and will affect any future actions for the style-sheet
var styleSheet = One.CSS.getStyleSheet('main');
styleSheet.autoCompile = false;
```

## TODO
* Add section about avoiding duplicate element keys
* Add feature to toggle off CSS syntax spacing
* Consider breaking HTML and CSS into `one/html` and `one/css` submodules.
* Add attribute class and id declaration to elements
```js
{
  h1: {
    class: 'class-name',
    id: 'some-id',
    content: 'Way cool text'
  }
};
```
* Allow defining attributes on elements (data, style, src, etc.)
```js
{
  img: {
    src: 'http://someimg.com/img.jpg',
    style: {
      border: '1px solid blue',
      margin: '5px'
    }
  }
};
```
* Create template syntax for defining elements
```js

var header = {
  h1: 'Cool site',
  ul: {...}
};

One.initDOM({
  template: header,
  div: {...}
});
```

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
var CSS = One.CSS;

CSS.init({
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
  Style = CSS.Style;

var style = new Style('p', {color: 'purple'});

CSS.compile();
```
The current stylesheet will now include the defined style `p {color: purple;}`.

* Edit previous styles

```js
// style variable from previous example
// => `p {color: purple;}`

style.update({color: 'green'});

CSS.compile();
```

Now the style is updated `p {color: green;}`.

## TODO
* Add section about avoiding duplicate element keys
* Add option to auto-comile on style created/update
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

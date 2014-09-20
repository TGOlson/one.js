# one.js

## Framework for single language client side applications.

Write HTML in JavaScript. Write CSS in JavaScript. Write JavaScript in JavaScript.

Lots of inspiration taken from [React](http://facebook.github.io/react/), as well many of the excellent templating libraries and JavaScript frameworks.

## Usage

* Create an `index.html` file, importing `jQuery`, `one.js` and any other JavaScript files.
* Write your entire client side application in JavaScript:

```js
One.initDOM({
  h1: 'Hi there',
  ul: {
    li: 'item one',
    li: 'item two'
  }
});

One.style({
  h1: {
    color: 'red',
    padding: '5px'
  },
  li: {
    list-style: none;
  }
});
```

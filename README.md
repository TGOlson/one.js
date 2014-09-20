# one.js

## Framework for single language client side applications.

Write HTML in JavaScript. Write CSS in JavaScript. Write JavaScript in JavaScript.

Lots of inspiration taken from [React](http://facebook.github.io/react/), as well many of the excellent templating libraries and JavaScript frameworks.

## Usage

* Create an `index.html` file, importing `jQuery`, `one.js` and any other JavaScript files. Note: `jQuery` needs to be loaded before `one.js` can run.
* Write an entire client side application in JavaScript.

## HTML as JavaScript

Write HTML using JavaScript object format.

```js
One.initDOM({
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
```

Gets translated to HTML

```html
<body>
  <h1>Hi there</h1>
  <p>Some sub-text</p>
  <div>
    <h3>Headline in a div</h3>
    <p>Text in a div</p>
    <div>
      <p>Nested text in a div</p>
      <p>Another paragraph in the same div</p>
    </div>
  </div>
  <ul>
    <li>item one</li>
    <li>item two</li>
  </ul>
</body>
```

Note: currently there is no way to define classes or ids. Also, duplicate elements on the save level have to be defined as arrays to avoid duplicate keys.

## CSS as JavaScript

Not yet implemented - possible syntax

```js
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

## TODO
* Add classes an ids to elements
```js
{
  'h1.class-name#some-id': 'Way cool text'
};

// or using attributes

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
* Display templated syntax for defining elements
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

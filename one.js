(function(definition) {

  // globally define One
  One = definition();

})(function() {
"use strict";

    // main module
var One  = {},

    // html sub-module
    HTML = {},

    // css sub-module
    CSS  = {};


HTML.init = function(domObject) {
  var elements = $.map(domObject, evaluateElementObject),
    body = $('body');

  append(body, elements);
};

function evaluateElementObject(value, elementName) {
  var element;

  if(typeof value === 'string') {
    element = createElementWithText(elementName, value);
  }

  if(Array.isArray(value)) {
    element = $.map(value, function(value) {
      return evaluateElementObject(value, elementName);
    });
  } else if(typeof value === 'object') {
    var elements = $.map(value, evaluateElementObject);
    element = createElement(elementName).append(elements);
  }

  return element;
}

function createElement(elementName) {
  return $('<' + elementName + '>');
}

function getClass(elementName) {
  var match = elementName.match(/[.](\w+)(-?)(\w+)/g),
    klass;

  if(match) {

    // take second element of match, which does not include preceding '.'
    klass = match; // [1].split('.');
  }

  return klass;
}

window.getClass = getClass;
window.getId = getId;

// only match 1 id per element
function getId(elementName) {
  // http://stackoverflow.com/questions/192048/can-an-html-element-have-multiple-ids
  var match = elementName.match(/[#](\S+)(?=(.|$))/),
    id;

  if(match) {

    // take second element of match, which does not include preceding '.'
    id = match[1].split('.');
  }

  return id;
}


function createElementWithText(elementName, text) {
  var element = createElement(elementName)
    .text(text);

  return element;
}

function append(parent, element) {
  parent.append(element);
}

// attach sub-modules
One.HTML = HTML;
One.CSS = CSS;

return One;

});

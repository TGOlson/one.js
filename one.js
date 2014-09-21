(function(definition) {

  // require/node
  if(typeof exports === 'object') {
    module.exports = definition();

  } else {
    // globally define One
    One = definition();
  }


})(function() {
"use strict";


var One  = {}, // main module
    HTML = {}, // html sub-module
    CSS  = {}; // css sub-module


/*
 * Public HTML Api
 */

HTML.init = function(domObject) {
  var elements = $.map(domObject, evaluateElementObject),
    body = $('body');

  append(body, elements);
};


/*
 * Private HTML Api
 */


HTML._parseClassesFromElementDeclaration = function(elementName) {
  var match = elementName.match(/[.](\w+)(-?)(\w+)/g),
    klasses;

  if(match) {
    klasses = match.map(function(klass) {
      return klass.replace('.', '');
    });
  }

  return klasses;
};


/*
 * Helpers
 */

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

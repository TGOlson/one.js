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
  var elements = $.map(domObject, evaluateElementDeclaration),
    body = $('body');

  append(body, elements);
};


/*
 * Private HTML Api
 */

// returns a space-separated string of all class present in element declaration
// undefined if no classes are present
HTML._parseElementTypeFromElementDeclaration = function(elementDeclaration) {
  var match = elementDeclaration.match(/^\w+-*\w*/);

  if(!match) {
    throw new Error('No element type in element declaration.');
  }

  return match.pop();
};

// returns a space-separated string of all class present in element declaration
// undefined if no classes are present
HTML._parseClassesFromElementDeclaration = function(elementDeclaration) {
  var match = elementDeclaration.match(/[.](\w+)(-?)(\w+)/g),
    klasses = null;

  if(match) {
    klasses = match.map(function(klass) {
      return klass.replace('.', '');
    }).join(' ');
  }

  return klasses;
};

// returns a string id if present in element declaration
// undefined if no id is present
// throw error if more than one id declared
HTML._parseIdFromElementDeclaration = function(elementDeclaration) {
  var match = elementDeclaration.match(/[#](\w+)(-?)(\w+)/g),
    id = null;

  if(match) {
    if(match.length > 1) throw new Error('Multiple ids in element declaration.');

    id = match.pop().replace('#', '');
  }

  return id;
};

HTML._convertElementDeclartionToObject = function(elementDeclaration) {
  var type = this._parseElementTypeFromElementDeclaration(elementDeclaration),
    klass = this._parseClassesFromElementDeclaration(elementDeclaration),
    id = this._parseIdFromElementDeclaration(elementDeclaration);

  return {
    type: type,
    class: klass,
    id: id
  };
};


/*
 * Helpers
 */

function evaluateElementDeclaration(value, elementDeclaration) {
  var element;

  if(typeof value === 'string') {
    element = createElementWithText(elementDeclaration, value);
  }

  if(Array.isArray(value)) {
    element = $.map(value, function(value) {
      return evaluateElementDeclaration(value, elementDeclaration);
    });
  } else if(typeof value === 'object') {
    var elements = $.map(value, evaluateElementDeclaration);
    element = createElement(elementDeclaration).append(elements);
  }

  return element;
}

function createElement(elementDeclaration) {
  var elementObject = HTML._convertElementDeclartionToObject(elementDeclaration),
    type = elementObject.type,
    klass = elementObject.class,
    id = elementObject.id;

  return $('<' + type + '>')
    .addClass(klass)
    .attr({id: id});
}

function createElementWithText(elementDeclaration, text) {
  var element = createElement(elementDeclaration)
    .text(text);

  return element;
}

function append(parent, element) {
  parent.append(element);
}

/*
 * Public CSS Api
 */

// currently does not accept nested styles
// write in standard css style
CSS.init = function(styleObject) {
  $.map(styleObject, evaluateStyleDeclaration);
};

function evaluateStyleDeclaration(value, element) {
  $(element).css(value);
}

// attach sub-modules
One.HTML = HTML;
One.CSS = CSS;

return One;

});

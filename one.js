(function(definition) {

  // globally define One
  One = definition();

})(function() {
  "use strict";

  var One = function() {};

  One.initDOM = function(domObject) {
    var elements = $.map(domObject, evaluateElementObject),
      body = $('body');

    append(body, elements);
  };

  function evaluateElementObject(value, elementName) {
    var element;

    if(typeof value === 'string') {
      element = createElementWithText(elementName, value);
    }

    if(typeof value === 'object') {
      if(Array.isArray(value)) {
        element = $.map(value, function(value) {
          console.log(elementName, value);
          return evaluateElementObject(value, elementName);
        });
      } else {
        var elements = $.map(value, evaluateElementObject);
        element = createElement(elementName).append(elements);
      }
    }

    return element;
  }

  function createElement(elementName) {
    return $('<' + elementName + '>');
  }

  function createElementWithText(elementName, text) {
    var element = createElement(elementName)
      .text(text);

    return element;
  }

  function append(parent, element) {
    parent.append(element);
  }

  return One;
});

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

if(!$) throw new Error('jQuery is required to use one.js');

function One() {}

One.HTML = HTML;
function HTML() {}

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
// write in standard css format
One.CSS = CSS;
function CSS() {}

CSS.autoCompile = true;

CSS._styleSheets = {};

CSS.getStyleSheet = getStyleSheet;
function getStyleSheet(id) {
  return CSS._styleSheets[id];
}

CSS.StyleSheet = StyleSheet;
function StyleSheet(id, styles) {
  if(!id) throw new Error('Must initialize StyleSheet with id');
  if(CSS._styleSheets[id]) throw new Error('StyleSheet ' + id + ' already initialized.');

  CSS._styleSheets[id] = this;

  this.id = id;
  this.element = makeElement(id);
  this.styles = {};
  this.autoCompile = CSS.autoCompile;

  if(styles) this.addStyles(styles);

  $('head').append(this.element);

  function makeElement(id) {
    var attrs = {
      type: 'text/css',
      id: id
    };

    return $('<style>').attr(attrs);
  }
}

StyleSheet.prototype.addStyles = function(styles) {
  var _this = this;

  $.map(styles, function(declarations, selector) {
    _this.addStyle(selector, declarations);
  });

  // add option to enable/disable auto-compilation
  return this.compileIfAutoCompile();
};

StyleSheet.prototype.getStyle = function(selector) {
  return this.styles[selector];
};

// assumes style is a style object
StyleSheet.prototype.addStyle = function(selector, declarations) {
  var style = new Style(selector, declarations);

  this.styles[style.selector] = style;

  style.styleSheet = this;

  this.compileIfAutoCompile();

  return style;
};

StyleSheet.prototype.updateStyle = function(selector, styles) {
  var style = this.getStyle(selector);

  if(!style) throw new Error('Style not defined');

  style.update(styles);

  this.compileIfAutoCompile();

  return style;
};

// currently assumes selector is a string
// later this could also accepts style objects
StyleSheet.prototype.removeStyle = function(selector) {
  var style = this.getStyle(selector);

  if(!style) throw new Error('Style not defined');

  delete this.styles[selector];

  this.compileIfAutoCompile();

  return style;
};

StyleSheet.prototype.compileIfAutoCompile = function() {
  if(this.autoCompile) this.compile();
};

StyleSheet.prototype.compile = function(stripWhiteSpace) {
  var css = this.toCSS(stripWhiteSpace);
  this.element.text(css);
};

StyleSheet.prototype.toCSS = function(stripWhiteSpace) {
  var delimiter = stripWhiteSpace ? '' : '\n';

  var styles = $.map(this.styles, function(style) {
    return style.toCSS(stripWhiteSpace);
  }).join(delimiter);

  return delimiter + styles + delimiter;
};

CSS.Style = Style;
function Style(selector, declarations) {
  this.selector = selector;
  this.declarations = declarations;
}

// ** format string to standard css formatting with spaces and newlines
// add option to not add spaces and newlines
Style.prototype.toCSS = function(stripWhiteSpace) {
  var styleString = this.selector + JSON.stringify(this.declarations),

    // set conditional delimiters
    space = stripWhiteSpace ? '' : ' ',
    newline = stripWhiteSpace ? '' : '\n',
    newlineDoubleSpace = stripWhiteSpace ? '' : '\n  ';

  // add space new line after opening bracket, followed by two spaces
  return styleString.replace(/{/g, space + '{' + newlineDoubleSpace)

    // remove all double quotes created from stringifying
    .replace(/"/g, '')

    // convert commas to semicolons, adding extra space
    .replace(/,/g, ';' + newlineDoubleSpace)

    // add extra space after each colon
    .replace(/:/g, ':' + space)

    // add closing semicolon and new line before closing brackets
    .replace(/}/g, ';' + newline + '}');
};

Style.prototype.update = function(declarations) {
  var _this = this;

  $.each(declarations, function(property, value) {
    _this.declarations[property] = value;
  });

  // check for auto compile if current style has a parent style-sheet
  if(this.styleSheet) this.styleSheet.compileIfAutoCompile();

  return this;
};

Style.prototype.getValue = function(property) {
  return this.declarations[property];
};

Style.prototype.removeValue = function(property) {
  var value = this.getValue(property);

  if(!value) throw new Error('Cannot remove value.');

  delete this.declarations[property];

  // check for auto compile if current style has a parent style-sheet
  if(this.styleSheet) this.styleSheet.compileIfAutoCompile();

  return this;
};

return One;
});

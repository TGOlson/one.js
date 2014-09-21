var HTML = require('../one').HTML;

describe('_parseClassesFromElementDeclaration', function() {
  it('should parse a simple class name from an element declaration', function() {
    var elementDeclaration = 'h1.header',
      klasses = HTML._parseClassesFromElementDeclaration(elementDeclaration);

    expect(klasses).toEqual(['header']);
  });

  it('should parse a class name with dashes from an element declaration', function() {
    var elementDeclaration = 'h1.another-class',
      klasses = HTML._parseClassesFromElementDeclaration(elementDeclaration);

    expect(klasses).toEqual(['another-class']);
  });

  it('should parse multiple simple class names from an element declaration', function() {
    var elementDeclaration = 'h1.header.small',
      klasses = HTML._parseClassesFromElementDeclaration(elementDeclaration);

    expect(klasses).toEqual(['header', 'small']);
  });

  it('should parse multiple simple and complex class names from an element declaration', function() {
    var elementDeclaration = 'h1.header.one-more.another-class.small',
      klasses = HTML._parseClassesFromElementDeclaration(elementDeclaration);

    expect(klasses).toEqual(['header', 'one-more', 'another-class', 'small']);
  });
});

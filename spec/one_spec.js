var HTML = require('../one').HTML;

describe('One', function() {

  describe('HTML', function() {

    describe('_parseElementTypeFromElementDeclaration', function() {
      it('should throw an error if no element is declared', function() {
        var elementDeclaration = '.class',
          elementName = HTML._parseElementTypeFromElementDeclaration.bind({}, elementDeclaration);

        expect(elementName).toThrow('No element type in element declaration.');
      });

      it('should return an element name if one is declared', function() {
        var elementDeclaration = 'h1',
          elementName = HTML._parseElementTypeFromElementDeclaration(elementDeclaration);

        expect(elementName).toBe('h1');
      });

      it('should return a single character element name', function() {
        var elementDeclaration = 'p',
          elementName = HTML._parseElementTypeFromElementDeclaration(elementDeclaration);

        expect(elementName).toBe('p');
      });

      it('should return an element name declared with a class', function() {
        var elementDeclaration = 'h1.class',
          elementName = HTML._parseElementTypeFromElementDeclaration(elementDeclaration);

        expect(elementName).toBe('h1');
      });

      it('should return an element name declared with an id', function() {
        var elementDeclaration = 'h1#id',
          elementName = HTML._parseElementTypeFromElementDeclaration(elementDeclaration);

        expect(elementName).toBe('h1');
      });

      it('should return an element name declared with classes and an id', function() {
        var elementDeclaration = 'h1.class.one-more#id',
          elementName = HTML._parseElementTypeFromElementDeclaration(elementDeclaration);

        expect(elementName).toBe('h1');
      });
    });

    describe('_parseClassesFromElementDeclaration', function() {
      it('should return null if no class names are present in an element declaration', function() {
        var elementDeclaration = 'h1',
          klasses = HTML._parseClassesFromElementDeclaration(elementDeclaration);

        expect(klasses).toBe(null);
      });

      it('should parse a simple class name from an element declaration', function() {
        var elementDeclaration = 'h1.header',
          klasses = HTML._parseClassesFromElementDeclaration(elementDeclaration);

        expect(klasses).toBe('header');
      });

      it('should parse a simple class name from an element declaration when an id is present', function() {
        var elementDeclaration = 'h1.header#id',
          klasses = HTML._parseClassesFromElementDeclaration(elementDeclaration);

        expect(klasses).toBe('header');
      });

      it('should parse a class name with dashes from an element declaration', function() {
        var elementDeclaration = 'h1.another-class',
          klasses = HTML._parseClassesFromElementDeclaration(elementDeclaration);

        expect(klasses).toBe('another-class');
      });

      it('should parse multiple simple class names from an element declaration', function() {
        var elementDeclaration = 'h1.header.small',
          klasses = HTML._parseClassesFromElementDeclaration(elementDeclaration);

        expect(klasses).toBe('header small');
      });

      it('should parse multiple simple and complex class names from an element declaration', function() {
        var elementDeclaration = 'h1.header.one-more.another-class.small',
          klasses = HTML._parseClassesFromElementDeclaration(elementDeclaration);

        expect(klasses).toBe('header one-more another-class small');
      });

      it('should parse multiple simple and complex class names from an element declaration when an id is present', function() {
        var elementDeclaration = 'h1.header.one-more#id.another-class.small',
          klasses = HTML._parseClassesFromElementDeclaration(elementDeclaration);

        expect(klasses).toBe('header one-more another-class small');
      });
    });

    describe('_parseIdFromElementDeclaration', function() {
      it('should return null if no id is present in an element declaration', function() {
        var elementDeclaration = 'h1',
          id = HTML._parseIdFromElementDeclaration(elementDeclaration);

        expect(id).toBe(null);
      });

      it('should parse a simple id from an element declaration', function() {
        var elementDeclaration = 'h1#id',
          id = HTML._parseIdFromElementDeclaration(elementDeclaration);

        expect(id).toBe('id');
      });

      it('hould parse a simple id from an element declaration when a class is present', function() {
        var elementDeclaration = 'h1.header#id',
          id = HTML._parseIdFromElementDeclaration(elementDeclaration);

        expect(id).toBe('id');
      });

      it('should parse an id with dashes from an element declaration', function() {
        var elementDeclaration = 'h1.another-class#some-id',
          id = HTML._parseIdFromElementDeclaration(elementDeclaration);

        expect(id).toBe('some-id');
      });

      it('should parse an id in a complex element declaration', function() {
        var elementDeclaration = 'h1.another-class#some-id.one.more-class',
          id = HTML._parseIdFromElementDeclaration(elementDeclaration);

        expect(id).toBe('some-id');
      });

      it('should throw an error if more than one id is present in an element declaration', function() {
        var elementDeclaration = 'h1#id#another',
          id = HTML._parseIdFromElementDeclaration.bind({}, elementDeclaration);

        expect(id).toThrow('Multiple ids in element declaration.');
      });
    });

  });
});


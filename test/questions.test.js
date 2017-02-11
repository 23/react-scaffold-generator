const questions = require('../src/questions.js');

describe('urlQuestion', () => {
  describe('filter', () => {
    const { urlQuestion: { filter } } = questions;

    it('should remove a leading slash', () => {
      expect(filter('/inbound/spots')).toBe('inbound/spots');
    });

    it('should remove a trailing slash', () => {
      expect(filter('inbound/spots/')).toBe('inbound/spots');
    });

    it('should remove both slashes', () => {
      expect(filter('/inbound/spots/')).toBe('inbound/spots');
    });
  });
});
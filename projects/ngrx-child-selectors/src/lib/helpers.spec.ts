import { capitalize } from './helpers';

describe('helpers', () => {
  describe('capitalize', () => {
    it('should capitalize the text', () => {
      expect(capitalize('marko')).toEqual('Marko');
    });

    it('should return an empty string when the text is an empty string', () => {
      expect(capitalize('')).toEqual('');
    });
  });
});

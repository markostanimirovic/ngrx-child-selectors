import { capitalize } from './helpers';

describe('helpers', () => {
  describe('capitalize', () => {
    it('should capitalize text', () => {
      expect(capitalize('marko')).toEqual('Marko');
    });

    it('should return an empty string when empty string is passed', () => {
      expect(capitalize('')).toEqual('');
    });
  });
});

import { multiply } from './demo';

describe('demo', () => {
  describe('multiply', () => {
    it('should multiply two numbers', () => {
      const result = multiply(2, 3);
      expect(result).toBe(6);
    });
  });
})

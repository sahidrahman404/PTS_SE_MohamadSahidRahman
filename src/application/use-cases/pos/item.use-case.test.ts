import { describe, expect, test } from 'vitest';
import { Item } from '@/application/use-cases/pos/item.use-case';

describe('test item use case', () => {
  test('throw an error when an item has no price for regular buyers', () => {
    const item = () => {
      new Item('oval hat', 'hats', {
        VIP: 15000,
      });
    };
    expect(item).toThrowError('must have a regular price');
  });
  test('falls back to the regular price when special prices for VIP or wholesale are not provided', () => {
    const item = new Item('oval hat', 'hats', {
      regular: 15000,
    });
    expect(item.getPrice('VIP')).toBe(15000);
  });
});

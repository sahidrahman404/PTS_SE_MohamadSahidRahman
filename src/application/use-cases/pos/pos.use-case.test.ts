import type { POSInput } from '@/entities/models/pos';
import { describe, expect, test } from 'vitest';
import { POS } from '@/application/use-cases/pos/pos.use-case';

describe('test pos use case', () => {
  const inputData: POSInput = {
    Items: [
      {
        name: 'oval hat',
        type: 'hats',
        prices: [
          {
            priceFor: 'regular',
            price: 20000,
          },
          {
            priceFor: 'VIP',
            price: 15000,
          },
        ],
      },
      {
        name: 'square hat',
        type: 'hats',
        prices: [
          {
            priceFor: 'regular',
            price: 30000,
          },
          {
            priceFor: 'VIP',
            price: 20000,
          },
          {
            priceFor: 'wholesale',
            price: 15000,
          },
        ],
      },
      {
        name: 'magic shirt',
        type: 'tops',
        prices: [
          {
            priceFor: 'regular',
            price: 50000,
          },
        ],
      },
    ],
    Buyers: [
      {
        name: 'Ani',
        type: 'regular',
      },
      {
        name: 'Budi',
        type: 'VIP',
      },
      {
        name: 'Charlie',
        type: 'regular',
      },
      {
        name: 'Dipta',
        type: 'wholesale',
      },
    ],
    Transaction: [
      {
        item: 'magic shirt',
        qty: 1,
        buyer: 'Ani',
      },
      {
        item: 'square hat',
        qty: 2,
        buyer: 'Budi',
      },
      {
        item: 'magic shirt',
        qty: 1,
        buyer: 'Ani',
      },
      {
        item: 'oval hat',
        qty: 1,
        buyer: 'Ani',
      },
      {
        item: 'square hat',
        qty: 100,
        buyer: 'Dipta',
      },
    ],
  };

  const getSummary = () => {
    const pos = new POS(inputData);
    return pos.getSummary();
  };
  test('should throw an error if the input contains duplicated items', () => {
    const inputData: POSInput = {
      Items: [
        {
          name: 'oval hat',
          type: 'hats',
          prices: [
            {
              priceFor: 'regular',
              price: 20000,
            },
            {
              priceFor: 'VIP',
              price: 15000,
            },
          ],
        },
        {
          name: 'oval hat',
          type: 'hats',
          prices: [
            {
              priceFor: 'regular',
              price: 30000,
            },
            {
              priceFor: 'VIP',
              price: 20000,
            },
            {
              priceFor: 'wholesale',
              price: 15000,
            },
          ],
        },
      ],
      Buyers: [
        {
          name: 'Ani',
          type: 'regular',
        },
      ],
      Transaction: [
        {
          item: 'magic shirt',
          qty: 1,
          buyer: 'Ani',
        },
      ],
    };

    const pos = () => {
      new POS(inputData);
    };
    expect(pos).toThrowError('Duplicate item name');
  });

  test('should throw an error if the input contains duplicated buyers', () => {
    const inputData: POSInput = {
      Items: [
        {
          name: 'oval hat',
          type: 'hats',
          prices: [
            {
              priceFor: 'regular',
              price: 20000,
            },
            {
              priceFor: 'VIP',
              price: 15000,
            },
          ],
        },
      ],
      Buyers: [
        {
          name: 'Ani',
          type: 'regular',
        },
        {
          name: 'Ani',
          type: 'regular',
        },
      ],
      Transaction: [
        {
          item: 'magic shirt',
          qty: 1,
          buyer: 'Ani',
        },
      ],
    };

    const pos = () => {
      new POS(inputData);
    };
    expect(pos).toThrowError('Duplicate buyer name');
  });

  test('should return the total number of transactions processed', () => {
    const transactionsProcessed = getSummary()['Summary']['totalTransaction'];
    expect(transactionsProcessed).toBe(5);
  });

  test('should return the name of the best selling item', () => {
    const bestSellingItem = getSummary()['Summary']['bestSellingItem'];
    expect(bestSellingItem).toBe('square hat');
  });

  test('should identify the best selling category', () => {
    const bestSellingCategory = getSummary()['Summary']['bestSellingCategory'];
    expect(bestSellingCategory).toBe('hats');
  });

  test('should calculate the revenue for each category', () => {
    const rpc = getSummary()['Summary']['rpc'];
    expect(rpc).toStrictEqual([
      {
        category: 'hats',
        revenue: 1560000,
      },
      {
        category: 'tops',
        revenue: 100000,
      },
      {
        category: 'shorts',
        revenue: 0,
      },
    ]);
  });

  test('should calculate the total revenue for the day', () => {
    const revenue = getSummary()['Summary']['revenue'];
    expect(revenue).toBe(1660000);
  });

  test('should return the top three customers by spending', () => {
    const bestSpenders = getSummary()['Summary']['bestSpenders'];
    expect(bestSpenders).toStrictEqual([
      {
        name: 'Dipta',
        type: 'wholesale',
        spent: 1500000,
      },
      {
        name: 'Ani',
        type: 'regular',
        spent: 120000,
      },
      {
        name: 'Budi',
        type: 'VIP',
        spent: 40000,
      },
    ]);
  });
});

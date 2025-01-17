import { POS } from '@/application/use-cases/pos/pos.use-case';
import type { POSInput } from '@/entities/models/pos';
import util from 'node:util';

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

try {
  const pos = new POS(inputData);
  const summary = pos.getSummary();
  console.log(util.inspect(summary, { depth: null }));
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

import type { BuyerType, Category } from '@/entities/models/pos';

export class Item {
  name: string;
  category: Category;
  prices: { [key in BuyerType]?: number };

  constructor(
    name: string,
    category: Category,
    prices: { [key in BuyerType]?: number },
  ) {
    if (!prices['regular']) {
      throw new Error(`Error: Item ${name} must have a regular price.`);
    }
    this.name = name;
    this.category = category;
    this.prices = prices;
  }

  getPrice(buyerType: BuyerType): number {
    return this.prices[buyerType] || this.prices['regular']!;
  }
}

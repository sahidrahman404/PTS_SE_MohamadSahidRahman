import type { Buyer } from '@/application/use-cases/pos/buyer.use-case';
import type { Item } from '@/application/use-cases/pos/item.use-case';

export class Transaction {
  buyer: Buyer;
  item: Item;
  quantity: number;

  constructor(buyer: Buyer, item: Item, quantity: number) {
    this.buyer = buyer;
    this.item = item;
    this.quantity = quantity;
  }

  getTotal(): number {
    return this.item.getPrice(this.buyer.type) * this.quantity;
  }
}

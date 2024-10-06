import type { BuyerType } from '@/entities/models/pos';

export class Buyer {
  name: string;
  type: BuyerType;

  constructor(name: string, type: BuyerType) {
    this.name = name;
    this.type = type;
  }
}

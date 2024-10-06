import { Item } from '@/application/use-cases/pos/item.use-case';
import { Buyer } from '@/application/use-cases/pos/buyer.use-case';
import { Transaction } from '@/application/use-cases/pos/transaction.use-case';
import type {
  BuyerType,
  Category,
  POSInput,
  Summary,
} from '@/entities/models/pos';

export class POS {
  private items: Record<string, Item> = {};
  private buyers: Record<string, Buyer> = {};
  private transactions: Transaction[] = [];

  constructor(inputData: POSInput) {
    this.loadData(inputData);
  }

  loadData(inputData: POSInput): void {
    inputData.Items.forEach((item) => this.addItem(item));
    inputData.Buyers.forEach((buyer) => this.addBuyer(buyer));
    inputData.Transaction.forEach((transaction) =>
      this.addTransaction(transaction),
    );
  }

  addItem(itemData: POSInput['Items'][0]): void {
    const prices: { [key in BuyerType]?: number } = {};
    itemData.prices.forEach((priceObj) => {
      prices[priceObj.priceFor] = priceObj.price;
    });

    const item = new Item(itemData.name, itemData.type, prices);
    if (this.items[item.name]) {
      throw new Error(`Error: Duplicate item name: ${item.name}`);
    }
    this.items[item.name] = item;
  }

  addBuyer(buyerData: POSInput['Buyers'][0]): void {
    const buyer = new Buyer(buyerData.name, buyerData.type);
    if (this.buyers[buyer.name]) {
      throw new Error(`Error: Duplicate buyer name: ${buyer.name}`);
    }
    this.buyers[buyer.name] = buyer;
  }

  addTransaction(transactionData: POSInput['Transaction'][0]): void {
    const buyer = this.buyers[transactionData.buyer];
    const item = this.items[transactionData.item];

    if (!buyer || !item) {
      throw new Error('Error: Invalid buyer or item name.');
    }

    const transaction = new Transaction(buyer, item, transactionData.qty);
    this.transactions.push(transaction);
  }

  getSummary(): Summary {
    const itemSales: Record<string, number> = {};
    const categorySales: Record<Category, number> = {
      ['hats']: 0,
      ['tops']: 0,
      ['shorts']: 0,
    };
    const buyerSpending: Record<string, { type: BuyerType; spent: number }> =
      {};

    let totalRevenue = 0;

    this.transactions.forEach((transaction) => {
      const itemTotal = transaction.getTotal();
      totalRevenue += itemTotal;

      itemSales[transaction.item.name] =
        (itemSales[transaction.item.name] || 0) + transaction.quantity;

      categorySales[transaction.item.category] =
        (categorySales[transaction.item.category] || 0) + itemTotal;

      let buyerSpend = buyerSpending[transaction.buyer.name];
      if (!buyerSpend) {
        buyerSpend = {
          type: transaction.buyer.type,
          spent: 0,
        };
      }

      buyerSpend.spent += itemTotal;

      buyerSpending[transaction.buyer.name] = buyerSpend;
    });

    const bestSellingItem = Object.entries(itemSales).reduce((best, current) =>
      current[1] > best[1] ? current : best,
    );
    const bestSellingCategory = Object.entries(categorySales).reduce(
      (best, current) => (current[1] > best[1] ? current : best),
    );

    const topSpenders = Object.entries(buyerSpending)
      .sort((a, b) => b[1].spent - a[1].spent)
      .slice(0, 3);

    return {
      Summary: {
        totalTransaction: this.transactions.length,
        bestSellingItem: bestSellingItem[0],
        bestSellingCategory: bestSellingCategory[0],
        rpc: Object.entries(categorySales).map(([category, revenue]) => ({
          category,
          revenue,
        })),
        revenue: totalRevenue,
        bestSpenders: topSpenders.map(([name, { type, spent }]) => ({
          name,
          type,
          spent,
        })),
      },
    };
  }
}

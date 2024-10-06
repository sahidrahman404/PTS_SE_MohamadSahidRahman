export type Category = 'hats' | 'tops' | 'shorts';

export type BuyerType = 'regular' | 'VIP' | 'wholesale';

type Price = {
  priceFor: BuyerType;
  price: number;
};

type Item = {
  name: string;
  type: Category;
  prices: Price[];
};

type Buyer = {
  name: string;
  type: BuyerType;
};

type Transaction = {
  item: string;
  qty: number;
  buyer: string;
};

type CategoryRevenue = {
  category: string;
  revenue: number;
};

type BestSpender = {
  name: string;
  type: string;
  spent: number;
};

export type POSInput = {
  Items: Item[];
  Buyers: Buyer[];
  Transaction: Transaction[];
};

export type Summary = {
  Summary: {
    totalTransaction: number;
    bestSellingItem: string;
    bestSellingCategory: string;
    rpc: CategoryRevenue[];
    revenue: number;
    bestSpenders: BestSpender[];
  };
};

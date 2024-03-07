interface Product {
  name: string;
  type: string;
  accounts: Account[];
}

interface Account {
  accountName: string;
  balance: number;
  pendingBalance?: number;
  cash?: number;
  marketValue?: number;
  transactions?: Array<any>;
}
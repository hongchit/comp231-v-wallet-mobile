// FinancialAccount model for the financial account data
export class FinancialAccount {
  id: string;
  name: string;
  number: string;
  initialBalance: number;
  balance: number;
  type: string;
  currency: string;

  constructor(
    id: string = '',
    name: string = '',
    number: string = '',
    initialBalance: number = 0,
    balance: number = 0,
    type: string = '',
    currency: string = 'CAD',
  ) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.initialBalance = Number(initialBalance.toFixed(2));
    this.balance = Number(balance.toFixed(2));
    this.type = type;
    this.currency = currency;
  }
}

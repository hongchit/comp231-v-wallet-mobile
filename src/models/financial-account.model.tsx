export class FinancialAccount {
  id: string;
  name: string;
  number: string;
  balance: number;

  constructor(
    id: string = '',
    name: string = '',
    number: string = '',
    balance: number = 0,
  ) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.balance = Number(balance.toFixed(2));
  }
}

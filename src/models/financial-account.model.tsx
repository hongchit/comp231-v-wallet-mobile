export class FinancialAccount {
  id: string;
  name: string;
  number: string;
  initialBalance: number;
  balance: number;
  type: string;
  financialAccountType: string;

  constructor(
    id: string = '',
    name: string = '',
    number: string = '',
    initialBalance: number = 0,
    balance: number = 0,
    type: string = '',
    financialAccountType: string = '',
  ) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.initialBalance = Number(initialBalance.toFixed(2));
    this.balance = Number(balance.toFixed(2));
    this.type = type;
    this.financialAccountType = financialAccountType;
  }
}

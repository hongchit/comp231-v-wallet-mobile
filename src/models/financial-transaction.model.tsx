export class FinancialTransaction {
  id: string;
  amount: number;
  description: string;
  type: string;
  date: Date;
  accountId: string;
  accountName: string;
  categoryName: string;

  constructor(
    id: string = '',
    amount: number = 0,
    description: string = '',
    type: string = '',
    date: Date = new Date(),
    accountId: string = '',
    accountName: string = '',
    categoryName: string = '',
  ) {
    this.id = id;
    this.amount = Number(amount.toFixed(2));
    this.description = description;
    this.type = type;
    this.date = date;
    this.accountId = accountId;
    this.accountName = accountName;
    this.categoryName = categoryName;
  }
}

import AccountType from './AccountType';
import Currency from './Currency';

export interface FinancialAccount {
  id: string;
  accountName: string;
  initialValue: number;
  currentValue: number;
  accountType: AccountType;
  currency: Currency;
  userAccountId: string;
}

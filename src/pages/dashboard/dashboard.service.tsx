import financialAccountApi from '../../apis/financial.api';
import { FinancialAccount } from '../../models/financial-account.model';
import { FinancialTransaction } from '../../models/financial-transaction.model';

export const dashboardService = (userPresence: any) => {
  const getFinancialAccounts = async (): Promise<FinancialAccount[]> => {
    try {
      var financialAccounts = await financialAccountApi(
        userPresence,
      ).getAccounts();
      return financialAccounts;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const getFinancialTransactions = async (): Promise<
    FinancialTransaction[]
  > => {
    try {
      var financialTransactions = await financialAccountApi(
        userPresence,
      ).getFinancialTransactions(userPresence.profileId);
      return financialTransactions.map((transaction: any) => ({
        id: transaction.Id,
        amount: transaction.Amount,
        description: transaction.Description,
        type: transaction.TransactionInformation,
        date: transaction.TransactionDate,
        accountId: transaction.AccountId,
        accountName: transaction.AccountName,
        categoryName: transaction.CategoryName,
      }));
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  return {
    getFinancialAccounts,
    getFinancialTransactions,
  };
};

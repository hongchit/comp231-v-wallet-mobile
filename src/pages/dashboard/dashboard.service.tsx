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

  // Create a new financial account
  const createFinancialAccount = async (
    account: FinancialAccount,
    singal?: AbortSignal,
  ) => {
    try {
      await financialAccountApi(userPresence).createAccount(account, singal);
    } catch (err) {
      console.log(err);
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
        id: transaction.id,
        amount: transaction.amount,
        description: transaction.description,
        type: transaction.transactionInformation,
        date: transaction.transactionDate,
        accountId: transaction.accountId,
        accountName: transaction.accountName,
        categoryName: transaction.categoryName,
      })) as FinancialTransaction[];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const createFinancialTransaction = async (
    transaction: FinancialTransaction,
  ) => {
    try {
      await financialAccountApi(userPresence).createTransaction(transaction);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getFinancialAccounts,
    createFinancialAccount,
    getFinancialTransactions,
    createFinancialTransaction,
  };
};

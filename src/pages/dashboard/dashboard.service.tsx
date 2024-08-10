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

  const createFinancialAccount = async (
    account: FinancialAccount,
    singal?: AbortSignal,
  ) => {
    try {
      await financialAccountApi(userPresence).createAccount(
        userPresence.profileId,
        account,
        singal,
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateFinancialAccount = async (
    account: FinancialAccount,
    singal?: AbortSignal,
  ) => {
    try {
      await financialAccountApi(userPresence).updateAccount(
        userPresence.profileId,
        account,
        singal,
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFinancialAccount = async (
    accountId: string,
    singal?: AbortSignal,
  ) => {
    try {
      await financialAccountApi(userPresence).deleteAccount(
        userPresence.profileId,
        accountId,
        singal,
      );
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
    updateFinancialAccount,
    deleteFinancialAccount,
    getFinancialTransactions,
    createFinancialTransaction,
  };
};

import financialAccountApi from '../apis/financial.api';
import { FinancialAccount } from '../models/financial-account.model';
import { FinancialTransaction } from '../models/financial-transaction.model';

export const financeService = (userPresence: any) => {
  const getFinancialAccount = async (
    accountId: string,
    signal?: AbortSignal,
  ): Promise<FinancialAccount | null> => {
    try {
      var response = await financialAccountApi(userPresence).getAccount(
        accountId,
        signal,
      );

      return response as FinancialAccount;
    } catch (error) {
      console.log(error);
      return new FinancialAccount();
      throw error;
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
      throw err;
    }
  };

  const deleteFinancialAccount = async (
    accountId: string,
    singal?: AbortSignal,
  ) => {
    try {
      await financialAccountApi(userPresence).deleteAccount(accountId, singal);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const getFinancialTransactionsByAccount = async (
    financialAccountId: string,
  ): Promise<FinancialTransaction[] | []> => {
    try {
      var response = await financialAccountApi(
        userPresence,
      ).getFinancialTransactionsByAccountId(financialAccountId);

      return response as FinancialTransaction[];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return {
    getFinancialAccount,
    updateFinancialAccount,
    deleteFinancialAccount,
    getFinancialTransactionsByAccount,
  };
};

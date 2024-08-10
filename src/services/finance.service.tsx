import financialAccountApi from '../apis/financial.api';
import { FinancialAccount } from '../models/financial-account.model';
import { FinancialTransaction } from '../models/financial-transaction.model';

export const financeService = (userPresence: any) => {
  const getFinancialAccount = async (
    accountId: string,
  ): Promise<FinancialAccount | null> => {
    try {
      var response = await financialAccountApi(userPresence).getAccount(
        accountId,
      );

      return response as FinancialAccount;
    } catch (error) {
      console.log(error);
      return null;
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
    getFinancialTransactionsByAccount,
  };
};

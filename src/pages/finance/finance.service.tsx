import financialAccountApi from '../../apis/financial.api';
import { FinancialAccount } from '../../models/financial-account.model';
import { FinancialTransaction } from '../../models/financial-transaction.model';

export const financeService = (userPresence: any) => {
  const getFinancialAccount = async (
    accountId: string,
    signal?: AbortSignal,
  ): Promise<FinancialAccount> => {
    try {
      var financialAccount = await financialAccountApi(userPresence).getAccount(
        accountId,
        signal,
      );
      return financialAccount;
    } catch (err) {
      console.log(err);
      return new FinancialAccount();
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

  return {
    getFinancialAccount,
    updateFinancialAccount,
    deleteFinancialAccount,
  };
};

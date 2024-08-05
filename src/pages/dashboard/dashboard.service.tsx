import financialAccountApi from '../../apis/financial.api';
import { FinancialAccount } from '../../models/financial-account.model';

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

  const getFinancialTransactions = async () => {
    try {
      //do the code;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getFinancialAccounts,
    getFinancialTransactions,
  };
};

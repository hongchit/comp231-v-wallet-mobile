import { config } from '../config/config';

export const financialAccountApi = (userPresence: any) => {
  let restApiUrlBase = config.restApiBase + '/finance';

  const getAccounts = async () => {
    let response = await fetch(
      `${restApiUrlBase}/${userPresence.profileId}/account`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userPresence.token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  };

  const getFinancialTransactions = async (userProfileId: string) => {
    let response = await fetch(
      `${restApiUrlBase}/${userProfileId}/transaction`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userPresence.token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  };

  const createTransaction = async (transaction: any) => {
    var newTransaction = {
      id: '',
      amount: transaction.amount,
      description: transaction.description,
      transactionInformation: transaction.type,
      categoryName: transaction.categoryName,
      accountId: transaction.accountId,
      accountName: transaction.accountName,
      transactionDate: transaction.date,
    };

    let response = await fetch(`${restApiUrlBase}/transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userPresence.token}`,
      },
      body: JSON.stringify(newTransaction),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  };

  return {
    getAccounts,
    getFinancialTransactions,
    createTransaction,
  };
};

export default financialAccountApi;

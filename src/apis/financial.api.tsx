export const financialAccountApi = (userPresence: any) => {
  let url = 'http://localhost:5241/api/finance';

  const getAccounts = async () => {
    let response = await fetch(`${url}/${userPresence.profileId}/account`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userPresence.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  };

  const getFinancialTransactions = async (userProfileId: string) => {
    let response = await fetch(`${url}/${userProfileId}/transaction`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userPresence.token}`,
      },
    });

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

    let response = await fetch(`${url}/transaction`, {
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

  const getAccount = async (accountId: string) => {
    let response = await fetch(`${url}/${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userPresence.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  };

  const getFinancialTransactionsByAccountId = async (accountId: string) => {
    let response = await fetch(`${url}/${accountId}/transaction`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userPresence.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  };

  return {
    getAccounts,
    getAccount,
    getFinancialTransactions,
    getFinancialTransactionsByAccountId,
    createTransaction,
  };
};

export default financialAccountApi;

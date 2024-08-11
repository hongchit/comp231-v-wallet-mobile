import { use } from 'chai';
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

  const getAccount = async (accountId: string, signal?: AbortSignal) => {
    let response = await fetch(
      `${restApiUrlBase}/${userPresence.profileId}/account/${accountId}`,
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

  const createAccount = async (
    userProfileId: string,
    account: any,
    signal?: AbortSignal,
  ) => {
    if (!userProfileId) {
      throw new Error('User Profile Id is required');
    }
    if (!account) {
      throw new Error('Account is required');
    }
    var newAccount = {
      name: account.name,
      number: account.number,
      type: account.type,
      currency: account.currency,
      financialAccountType: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: '',
        description: '',
      },
    };

    let response = await fetch(`${restApiUrlBase}/${userProfileId}/account`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${userPresence.token}`,
      },
      signal: signal,
      body: JSON.stringify(newAccount),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  };

  const updateAccount = async (
    userProfileId: string,
    account: any,
    signal?: AbortSignal,
  ) => {
    if (!userProfileId) {
      throw new Error('User Profile Id is required');
    }
    if (!account) {
      throw new Error('Account is required');
    }
    var updatedAccount = {
      id: account.id,
      name: account.name,
      number: account.number,
      type: account.type,
      currency: account.currency,
      financialAccountType: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: '',
        description: '',
      },
    };

    let response = await fetch(`${restApiUrlBase}/${userProfileId}/account`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${userPresence.token}`,
      },
      signal: signal,
      body: JSON.stringify(updatedAccount),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
  };

  const deleteAccount = async (
    userProfileId: string,
    accountId: string,
    signal?: AbortSignal,
  ) => {
    if (!userProfileId) {
      throw new Error('User Profile Id is required');
    }
    if (!accountId) {
      throw new Error('Account Id is required');
    }

    let response = await fetch(
      `${restApiUrlBase}/${userProfileId}/account/${accountId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${userPresence.token}`,
        },
        signal: signal,
      },
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }
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

  const getFinancialTransactionsByAccountId = async (accountId: string) => {
    let response = await fetch(`${restApiUrlBase}/${accountId}/transactions`, {
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
    createAccount,
    updateAccount,
    deleteAccount,
    getFinancialTransactions,
    getFinancialTransactionsByAccountId,
    createTransaction,
  };
};

export default financialAccountApi;

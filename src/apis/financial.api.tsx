import { use } from 'chai';
import { config } from '../config/config';

// APIs calls for financial accounts and transactions handling
export const financialAccountApi = (userPresence: any) => {
  let restApiUrlBase = config.restApiBase + '/finance';

  // Retrieve all accounts
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

  // Retrieve a specific account
  const getAccount = async (accountId: string, signal?: AbortSignal) => {
    let response = await fetch(`${restApiUrlBase}/account/${accountId}`, {
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

  // Create a new account
  const createAccount = async (account: any, signal?: AbortSignal) => {
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
      initialBalance: account.initialBalance,
      balance: account.balance,
    };

    let response = await fetch(`${restApiUrlBase}/account`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${userPresence.token}`,
        UserProfileId: `${userPresence.profileId}`,
      },
      signal: signal,
      body: JSON.stringify(newAccount),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  };

  // Update an account
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
      initialBalance: account.initialBalance,
      balance: account.balance,
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

  // Delete an account
  const deleteAccount = async (accountId: string, signal?: AbortSignal) => {
    if (!accountId) {
      throw new Error('Account Id is required');
    }

    let response = await fetch(`${restApiUrlBase}/account/${accountId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${userPresence.token}`,
      },
      signal: signal,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
  };

  // Retrieve all transactions for a specific user
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

  // Create a new transaction
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

  // Retrieve all transactions for a specific account
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

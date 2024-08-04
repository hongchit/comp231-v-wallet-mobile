import { config } from '../config/config';
import { FinancialAccount } from '../models/FinancialAccount';

export const accountsApi = () => {
  let restApiUrlBase = config.restApiBase + '/finance/Account';

  const list = async (token: string, signal: AbortSignal) => {
    try {
      const response = await fetch(restApiUrlBase, {
        method: 'GET',
        signal: signal,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        throw new Error('Unauthorized');
      } else if (response.status !== 200) {
        throw new Error('Failed to fetch accounts: ' + response);
      }

      return response.json();
    } catch (error) {
      console.error('Failed API on list accounts:', error);
      throw error;
    }
  };

  const get = async (accountId: string, token: string, signal: AbortSignal) => {
    try {
      const response = await fetch(restApiUrlBase + '/' + accountId, {
        method: 'GET',
        signal: signal,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        throw new Error('Unauthorized');
      } else if (response.status !== 200) {
        throw new Error('Failed to fetch account: ' + response);
      }

      const data = await response.json();
      console.log('Account:', data);
      const account: FinancialAccount = {
        id: data.id,
        accountName: data.accountName,
        initialValue: data.initialValue,
        currentValue: data.currentValue,
        accountType: data.accountType,
        currency: data.currency,
        userAccountId: data.userAccountId,
      };
      return account;
    } catch (error) {
      console.error('Failed API on get account:', error);
      throw error;
    }
  };

  const create = async (
    account: FinancialAccount,
    token: string,
    signal: AbortSignal,
  ) => {
    try {
      const response = await fetch(restApiUrlBase, {
        method: 'POST',
        signal: signal,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(account),
      });

      if (response.status === 403) {
        throw new Error('Unauthorized');
      } else if (response.status !== 201) {
        throw new Error('Failed to create account: ' + response);
      }

      return response.json();
    } catch (error) {
      console.error('Failed API on create account:', error);
      throw error;
    }
  };

  return {
    list,
  };
};

export default accountsApi;

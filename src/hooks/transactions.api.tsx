import e from 'express';
import { config } from '../config/config';

export const transactionsApi = () => {
  let restApiUrlBase = config.restApiBase + '/api/Finance';

  const list = async (
    accountId: string,
    token: string,
    signal: AbortSignal | null | undefined,
  ) => {
    return fetch(restApiUrlBase + '/' + accountId + '/transactions', {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 403) {
          throw new Error('Unauthorized');
        } else if (response.status !== 200) {
          throw new Error('Failed to fetch transactions: ' + response);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Failed API on list transactions:', error);
        throw error;
      });
  };

  return {
    list,
  };
};

export default transactionsApi;

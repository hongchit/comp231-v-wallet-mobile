import { config } from '../config/config';

export const accountsApi = () => {
  let restApiUrlBase = config.restApiBase + '/api/FinAccount';

  const list = async (
    token: string,
    signal: AbortSignal | null | undefined,
  ) => {
    return fetch(restApiUrlBase, {
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
          throw new Error('Failed to fetch accounts: ' + response);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Failed API on list accounts:', error);
        throw error;
      });
  };

  return {
    list,
  };
};

export default accountsApi;

import { useState } from 'react';
import authApi from './auth.api';

export const useToken = (): [string | null, (newToken: string) => void] => {
  const [token, setTokenInternal] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('jwt');
    }
    return null;
  });

  const setToken = async (newToken: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jwt', newToken);
      setTokenInternal(newToken);
      if (!newToken) {
        console.log('Logging out');
        try {
          const data = await authApi().logout();
          console.log(data.message);
          document.cookie =
            't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return [token, setToken];
};

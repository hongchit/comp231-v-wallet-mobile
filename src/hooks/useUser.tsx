import { useEffect, useState } from 'react';
import { useToken } from './useToken';

export const useUser = () => {
  const [token, setToken] = useToken();

  const getPayloadFromToken = (token: string) => {
    if (!token) {
      return null;
    }
    console.log('getPayloadFromToken Token:', token);
    const payload = token.split('.')[1];
    const base64 = payload.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    const payload = getPayloadFromToken(token);
    console.log('getPayloadFromToken Payload}:', payload);
    return payload;
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    setUser(getPayloadFromToken(token));
    console.log('getPayloadFromToken User:', user);
  }, [token]);

  return user;
};

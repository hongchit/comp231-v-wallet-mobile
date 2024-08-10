import { UserProfile } from '../models/userRegistration.model';

import { config } from '../config/config';

export const accountsApi = () => {
  let restApiUrlBase = config.restApiBase + '/account';

  const login = async (email: string, password: string) => {
    let response = await fetch(`${restApiUrlBase}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  };

  const logout = async () => {
    let response = await fetch(`${restApiUrlBase}/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  };

  const register = async (userProfile: UserProfile) => {
    let response = await fetch(`${url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userProfile),
    });

    return await response.json();
  };

  return {
    login,
    logout,
    register,
  };
};

export default accountsApi;

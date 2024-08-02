import { config } from '../config/config';

export const authApi = () => {
  let url = config.restApiBase + '/account';

  const login = async (email: string, password: string) => {
    try {
      let response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        return null;
      }

      let token;
      try {
        token = await response.json();
        console.log(token);
      } catch (error) {
        console.error('Failed to parse response body:', response);
        throw error;
      }

      return token;
    } catch (error) {
      console.error('Failed to call login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      let response = await fetch(`${url}/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  return {
    login,
    logout,
  };
};

export default authApi;

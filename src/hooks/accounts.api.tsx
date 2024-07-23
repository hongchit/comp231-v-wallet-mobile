export const accountsApi = () => {
  let url = 'http://localhost:5241/api/account';

  const login = async (email: string, password: string) => {
    try {
      let response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to call login:', error);
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

export default accountsApi;

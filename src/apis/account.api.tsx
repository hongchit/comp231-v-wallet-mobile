export const accountsApi = () => {
  let url = 'http://localhost:5241/api/account';
  const login = async (email: string, password: string) => {
    let response = await fetch(`${url}/login`, {
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
    let response = await fetch(`${url}/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  };

  return {
    login,
    logout,
  };
};

export default accountsApi;

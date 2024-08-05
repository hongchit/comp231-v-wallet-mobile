export const financialAccountApi = (userPresence: any) => {
  let url = 'http://localhost:5241/api/finance';

  const getAccounts = async () => {
    let response = await fetch(`${url}/${userPresence.profileId}/account`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userPresence.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  };

  return {
    getAccounts,
  };
};

export default financialAccountApi;

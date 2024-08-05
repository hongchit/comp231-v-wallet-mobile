import { setGlobalState } from '../global/global.state';
import accountsApi from '../apis/account.api';

export const accountsService = () => {
  const login = async (email: string, password: string) => {
    try {
      var authenticatedUser = await accountsApi().login(email, password);

      if (authenticatedUser == null) {
        return null;
      }

      localStorage.setItem(
        'user-presence',
        JSON.stringify({
          token: `Bearer ${authenticatedUser.token}`,
          email: authenticatedUser.email,
          name: authenticatedUser.name,
          accountId: authenticatedUser.accountId,
          profileId: authenticatedUser.profileId,
        }),
      );

      setGlobalState('userPresence', authenticatedUser);
      return authenticatedUser;
    } catch {
      return null;
    }
  };

  const logout = async () => {
    try {
      await accountsApi().logout();
      localStorage.removeItem('user-presence');
    } catch {
      localStorage.removeItem('user-presence');
    }
  };

  return {
    login,
    logout,
  };
};

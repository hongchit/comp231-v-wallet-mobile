import { setGlobalState, useGlobalState } from '../global/global.state';
import accountsApi from '../hooks/accounts.api';

export const accountsService = () => {
  const login = async (email: string, password: string) => {
    try {
      var authenticatedUser = await accountsApi().login(email, password);

      if (authenticatedUser == null) {
        return null;
      }

      localStorage.setItem('user-presence', JSON.stringify(authenticatedUser));

      setGlobalState('userPresence', authenticatedUser);
      return authenticatedUser;
    } catch {
      debugger;
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

import { authApi } from './auth.api';

export const AuthHelper = () => {
  const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    if (sessionStorage.getItem('jwt')) {
      return JSON.parse(sessionStorage.getItem('jwt') as string);
    } else {
      return false;
    }
  };

  const authenticate = (jwt: any, cb?: () => void) => {
    if (typeof window !== 'undefined' && jwt) {
      if (jwt) {
        console.log('jwt', jwt);
        sessionStorage.setItem('jwt', JSON.stringify(jwt));
        cb && cb();
      } else {
        logout();
      }
    }
  };

  const logout = (cb?: () => void) => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('jwt');
      cb && cb();
    }
    authApi()
      .logout()
      .then((data: any) => {
        console.log(data.message);
        document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      });
  };

  return {
    isAuthenticated,
    authenticate,
    logout,
  };
};

export default AuthHelper;

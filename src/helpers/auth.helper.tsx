class AuthHelper {
  authenticateUser = (user: any) => {
    localStorage.setItem('user-presence', JSON.stringify(user));
  };

  logoutUser = () => {
    localStorage.removeItem('user-presence');
  };

  isAuthenticated = () => {
    const userPresence = localStorage.getItem('user-presence');
    if (userPresence) {
      var user = JSON.parse(userPresence);

      return user && user.token;
    }

    return false;
  };

  getAuthenticatedUser = async () => {
    const userPresence = localStorage.getItem('user-presence');
    if (userPresence) {
      return JSON.parse(userPresence);
    }

    return null;
  };
}

export default new AuthHelper();

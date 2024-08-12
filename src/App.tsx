import React, { useEffect, useRef, useState } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, useHistory } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './pages/login/Login';
import FinancialAccount from './pages/finance/FinancialAccount';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import authHelper from './helpers/auth.helper';
import Dashboard from './pages/dashboard/Dashboard';
import { setGlobalState, useGlobalState } from './global/global.state';
import UpdateAccount from './pages/finance/UpdateAccount';
import { PrivateRoute } from './components/PrivateRoute';

setupIonicReact();

const App: React.FC = () => {
  const history = useHistory();
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Use a ref to persist the timer across renders
  const [userPresence, setUserPresence] = useGlobalState('userPresence');

  const initializeGlobalState = async () => {
    const userPresence = await authHelper.getAuthenticatedUser();
    if (userPresence) {
      setGlobalState('userPresence', userPresence);
    }
  };

  // Initialize global state and set up idle timer to detect user inactivity
  useEffect(() => {
    initializeGlobalState();

    const maxIdleTime = 15 * 60 * 1000; // 15 minutes in milliseconds

    // Idle timer function to logout user after a period of inactivity
    const resetIdleTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        console.log('User has been inactive for too long. Logging out.');
        authHelper.logoutUser();
        setUserPresence({
          token: '',
          email: '',
          name: '',
          accountId: '',
          profileId: '',
        });
        if (history) {
          history.push('/login');
        }
      }, maxIdleTime);
    };

    // Set up event listeners for user activity
    const events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress',
    ];
    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });

    // Set the initial timer
    resetIdleTimer();

    // Cleanup event listeners on unmount
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
      // if (timer) clearTimeout(timer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [history]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {userPresence.token === '' ? null : <Menu />}
          <IonRouterOutlet id="main">
            <Route path="/login" component={Login} exact={true} />
            <Route path="/" exact={true}>
              {userPresence && authHelper.isAuthenticated() ? (
                <Page name="Dashboard">
                  <Dashboard />
                </Page>
              ) : (
                <Login />
              )}
            </Route>
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
              exact={true}
            />
            <PrivateRoute
              path="/financial-account/:accountId/edit"
              component={UpdateAccount}
              exact={true}
            />
            <PrivateRoute
              path="/financial-account/:accountId"
              component={FinancialAccount}
              exact
            />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

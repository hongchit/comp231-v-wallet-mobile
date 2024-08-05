import React, { useEffect, useState } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';

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

setupIonicReact();

const App: React.FC = () => {
  const [idleTime, setIdleTime] = useState(0);
  const history = useHistory();
  const [userPresence] = useGlobalState('userPresence');

  const initializeGlobalState = async () => {
    const userPresence = await authHelper.getAuthenticatedUser();
    if (userPresence) {
      setGlobalState('userPresence', userPresence);
    }
  };

  useEffect(() => {
    initializeGlobalState();

    const maxIdleTime = 15 * 60 * 1000; // 15 minutes in milliseconds
    let timer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      setIdleTime(0);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        history.push('/login');
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
      if (timer) clearTimeout(timer);
    };
  }, [history]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {userPresence.token === '' ? null : <Menu />}
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              {userPresence && authHelper.isAuthenticated() ? (
                <Page name="Dashboard">
                  <Dashboard />
                </Page>
              ) : (
                <Login />
              )}
            </Route>
            <Route path="/dashboard" component={Dashboard} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/signup" component={SignUp} exact={true} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

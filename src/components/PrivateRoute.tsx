import { Route, useHistory, useLocation } from 'react-router';
import { useGlobalState } from '../global/global.state';
import { logIn } from 'ionicons/icons';
import { IonButton, IonContent, IonIcon } from '@ionic/react';
import { useEffect, useState } from 'react';

// PrivateRoute component, responsible for handling routes that require authentication.
export const PrivateRoute = (props: any) => {
  const history = useHistory();
  const location = useLocation();
  const [userPresence] = useGlobalState('userPresence');
  const [content, setContent] = useState<JSX.Element | null>(null);

  // Redner content based on user presence.
  useEffect(() => {
    if (
      location.pathname != '/login' &&
      (!userPresence || !userPresence.profileId)
    ) {
      // User is not authenticated. Show session expired.
      console.log(
        'PrivateRoute: User is not authenticated. Redirecting to login page.',
      );

      // Due to infinite loop, only show a button to redirect to login page.
      setContent(
        <IonContent className="ion-padding ion-text-center">
          <IonIcon aria-hidden="true" slot="start" icon={logIn} />
          <IonButton
            fill="clear"
            className="login-button"
            onClick={() => history.push('/login')}
          >
            Session Expired. Please login again.
          </IonButton>
        </IonContent>,
      );
    } else {
      // User is authenticated. Show the acutal route content.
      setContent(<Route {...props} />);
    }
  }, [userPresence, userPresence?.token, location.state, location.pathname]);

  return content;
};

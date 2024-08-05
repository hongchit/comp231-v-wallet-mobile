import { IonButton, IonContent, IonIcon } from '@ionic/react';
import { Route, useHistory } from 'react-router-dom';
import { logIn } from 'ionicons/icons';
import { useUser } from '../hooks/useUser';

export const PrivateRoute = (props: any) => {
  const user = useUser();
  const history = useHistory();

  if (!user) {
    // TODO: redirect to login page.
    // Due to infinite loop, we will just show a button to redirect to login page.
    return (
      <IonContent className="ion-padding ion-text-center">
        <IonIcon aria-hidden="true" slot="start" icon={logIn} />
        <IonButton
          fill="clear"
          className="login-button"
          onClick={() => history.push('/login')}
        >
          Session expired. Login again.
        </IonButton>
      </IonContent>
    );
  }

  return <Route {...props} />;
};

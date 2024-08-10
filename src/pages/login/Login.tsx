import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
} from '@ionic/react';

import { useHistory } from 'react-router-dom';
import { accountsService } from '../../services/accounts.service';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setError] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    if (hasError) {
      setError(false);
    }

    const authenticatedUser = await accountsService().login(email, password);

    if (authenticatedUser == null) {
      setError(true);
      return;
    }

    history.push('/dashboard');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonButton expand="full" onClick={handleLogin}>
          Login
        </IonButton>
        {hasError ? (
          <IonText color="warning">Username or password is incorrect</IonText>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Login;

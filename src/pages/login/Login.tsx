import React, { useState } from 'react';
import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
  IonSegment,
  IonSegmentButton,
  IonModal,
} from '@ionic/react';

import { useHistory } from 'react-router-dom';
import { accountsService } from '../../services/accounts.service';
import SignUpForm from '../../components/SignForm';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

    history.push('/');
  };

  const [showLogin, setShowLogin] = useState(true);

  async function handleSignUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    birthDate: string,
  ) {
    try {
      if (password !== confirmPassword) {
        return;
      }

      await accountsService().register({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        birthDate: new Date(birthDate),
      });

      history.push('/');
    } catch {
      setShowModal(true);
    }
  }

  return (
    <>
      <IonSegment
        value={showLogin ? 'login' : 'register'}
        onIonChange={(e) => setShowLogin(e.detail.value === 'login')}
      >
        <IonSegmentButton value="login" defaultChecked>
          <IonLabel>Login</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="register">
          <IonLabel>Register</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {showLogin ? (
        <>
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
              <IonText color="warning">
                Username or password is incorrect
              </IonText>
            ) : null}
          </IonContent>
        </>
      ) : (
        <SignUpForm handleSignUp={handleSignUp} />
      )}

      <IonModal isOpen={showModal}>
        <IonContent>
          <IonText>Registration failed.</IonText>
          <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Login;

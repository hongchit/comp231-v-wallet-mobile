import React, { useState } from 'react';
import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonList,
  IonDatetime,
  IonText,
} from '@ionic/react';

interface SignUpFormProps {
  handleSignUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    birthDate: string,
  ) => {};
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setDateOfBirth] = useState('');

  const onSignUp = () => {
    handleSignUp(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      birthDate,
    );
  };

  return (
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput
            style={{ marginTop: '25px' }}
            value={firstName}
            onIonChange={(e) => setFirstName(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput
            style={{ marginTop: '25px' }}
            value={lastName}
            onIonChange={(e) => setLastName(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            style={{ marginTop: '25px' }}
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            style={{ marginTop: '25px' }}
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput
            style={{ marginTop: '25px' }}
            type="password"
            value={confirmPassword}
            onIonChange={(e) => setConfirmPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        {password !== confirmPassword && (
          <IonText color="danger">Passwords does not match</IonText>
        )}
        <IonItem>
          <IonLabel position="floating">Date of Birth (optional)</IonLabel>
          <IonDatetime
            style={{ marginTop: '40px' }}
            value={birthDate}
            presentation="date"
            onIonChange={(e) => setDateOfBirth(e.detail.value as string)}
          ></IonDatetime>
        </IonItem>
        <IonButton
          expand="full"
          onClick={onSignUp}
          disabled={password !== confirmPassword}
        >
          Register
        </IonButton>
      </IonList>
    </IonContent>
  );
};

export default SignUpForm;

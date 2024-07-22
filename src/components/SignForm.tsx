import React, { useState } from 'react';
import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonCheckbox,
  IonList,
  IonDatetime,
} from '@ionic/react';

interface SignUpFormProps {
  handleProfilePictureChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleSignUp: (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    username: string,
    password: string,
    confirmPassword: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    termsAccepted: boolean,
  ) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  handleProfilePictureChange,
  handleSignUp,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const onSignUp = () => {
    handleSignUp(
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password,
      confirmPassword,
      dateOfBirth,
      gender,
      address,
      termsAccepted,
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
          <IonLabel position="floating">Phone Number</IonLabel>
          <IonInput
            style={{ marginTop: '25px' }}
            type="tel"
            value={phoneNumber}
            onIonChange={(e) => setPhoneNumber(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            style={{ marginTop: '25px' }}
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
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
        <IonItem>
          <IonLabel position="floating">Date of Birth (optional)</IonLabel>
          <IonDatetime
            style={{ marginTop: '40px' }}
            value={dateOfBirth}
            presentation="date"
            onIonChange={(e) => setDateOfBirth(e.detail.value as string)}
          ></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Gender (optional)</IonLabel>
          <IonInput
            style={{ marginTop: '25px' }}
            value={gender}
            onIonChange={(e) => setGender(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Address (optional)</IonLabel>
          <IonInput
            style={{ marginTop: '25px' }}
            value={address}
            onIonChange={(e) => setAddress(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Profile Picture (optional)</IonLabel>
          <input
            style={{ marginLeft: '50px' }}
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </IonItem>
        <IonItem>
          <IonCheckbox
            checked={termsAccepted}
            onIonChange={(e) => setTermsAccepted(e.detail.checked)}
          ></IonCheckbox>
          <IonLabel style={{ marginRight: '134px' }}>
            I accept the terms and conditions
          </IonLabel>
        </IonItem>
        <IonButton expand="full" onClick={onSignUp}>
          Register
        </IonButton>
      </IonList>
    </IonContent>
  );
};

export default SignUpForm;

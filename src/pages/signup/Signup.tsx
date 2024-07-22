import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import SignUpForm from '../../components/SignForm';
import { useHistory } from 'react-router';

const SignUp: React.FC = () => {
  const history = useHistory();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleSignUp = (
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
  ) => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!termsAccepted) {
      alert('You must accept the terms and conditions!');
      return;
    }

    // Handle sign-up logic here, typically involves calling an API
    console.log('Sign-Up:', {
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password,
      dateOfBirth,
      gender,
      address,
      profilePicture,
      termsAccepted,
    });

    history.push('/folder/Inbox');
  };

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <SignUpForm
        handleProfilePictureChange={handleProfilePictureChange}
        handleSignUp={handleSignUp}
      />
    </IonPage>
  );
};

export default SignUp;

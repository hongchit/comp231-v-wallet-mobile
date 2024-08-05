import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import SignUpForm from '../../components/SignForm';
import { useHistory } from 'react-router';
import AccountForm from '../../components/AccountForm';

const Account: React.FC = () => {
  return (
    <IonPage>
      <AccountForm />
    </IonPage>
  );
};

export default Account;

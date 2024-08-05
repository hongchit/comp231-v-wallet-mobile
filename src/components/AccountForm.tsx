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
  IonSelect,
  IonSelectOption,
  IonList,
  IonFooter,
} from '@ionic/react';

const AccountForm: React.FC = () => {
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [balance, setBalance] = useState('');
  const [currency, setCurrency] = useState('');

  const handleSave = () => {
    const accountData = {
      accountName,
      accountType,
      accountNumber,
      bankName,
      balance,
      currency,
    };
    console.log('Account Data:', accountData);
    // Add logic to save the account data
  };

  const handleCancel = () => {
    // Add logic to cancel the form
    setAccountName('');
    setAccountType('');
    setAccountNumber('');
    setBankName('');
    setBalance('');
    setCurrency('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Account Name</IonLabel>
            <IonInput
              style={{ marginTop: '25px' }}
              value={accountName}
              onIonChange={(e) => setAccountName(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Account Type</IonLabel>
            <IonSelect
              style={{ marginTop: '25px' }}
              value={accountType}
              onIonChange={(e) => setAccountType(e.detail.value)}
            >
              <IonSelectOption value="" disabled>
                Please select
              </IonSelectOption>
              <IonSelectOption value="Savings">Savings</IonSelectOption>
              <IonSelectOption value="Checking">Checking</IonSelectOption>
              <IonSelectOption value="Credit">Credit</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Account Number</IonLabel>
            <IonInput
              style={{ marginTop: '25px' }}
              value={accountNumber}
              onIonChange={(e) => setAccountNumber(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Bank Name</IonLabel>
            <IonInput
              style={{ marginTop: '25px' }}
              value={bankName}
              onIonChange={(e) => setBankName(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Balance</IonLabel>
            <IonInput
              style={{ marginTop: '25px' }}
              type="number"
              value={balance}
              onIonChange={(e) => setBalance(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Currency</IonLabel>
            <IonSelect
              style={{ marginTop: '25px' }}
              value={currency}
              onIonChange={(e) => setCurrency(e.detail.value)}
            >
              <IonSelectOption value="" disabled>
                Please select
              </IonSelectOption>
              <IonSelectOption value="USD">USD</IonSelectOption>
              <IonSelectOption value="EUR">EUR</IonSelectOption>
              <IonSelectOption value="GBP">GBP</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton expand="block" onClick={handleSave}>
            Save
          </IonButton>
          <IonButton expand="block" color="light" onClick={handleCancel}>
            Cancel
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default AccountForm;

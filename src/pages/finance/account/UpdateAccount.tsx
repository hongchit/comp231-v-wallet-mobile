import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonTitle,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { FinancialAccount } from '../../../models/FinancialAccount';
import accountsApi from '../../../hooks/accounts.api';
import { useToken } from '../../../hooks/useToken';
import { useUser } from '../../../hooks/useUser';

const UpdateAccount: React.FC = () => {
  const [token, setToken] = useToken();
  const user = useUser();
  const history = useHistory();

  const { accountId } = useParams<{ accountId: string }>();
  const [account, setAccount] = useState<FinancialAccount | null>(null);
  const [accountName, setAccountName] = useState('');
  const [initialValue, setInitialValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [accountType, setAccountType] = useState('');
  const [currency, setCurrency] = useState('');

  if (!token) {
    history.push('/login');
    return <IonPage />;
  }

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const signal = new AbortController().signal;
        const fetchedAccount = await accountsApi().get(
          accountId,
          token,
          signal,
        );
        setAccount(fetchedAccount);
        setAccountName(fetchedAccount.accountName);
        setInitialValue(fetchedAccount.initialValue);
        setCurrentValue(fetchedAccount.currentValue);
        setAccountType(fetchedAccount.accountType);
        setCurrency(fetchedAccount.currency);
      } catch (error) {
        console.error('Failed to fetch account:', error);
      }
    };

    fetchAccount();
  }, [accountId, token]);

  const handleUpdateAccount = async () => {
    try {
      const updatedAccount: FinancialAccount = {
        id: accountId,
        accountName,
        initialValue,
        currentValue,
        accountType,
        currency,
        userAccountId: account?.userAccountId || user.primarysid,
      };

      const token = ''; // Add your authentication token here
      const signal = new AbortController().signal;
      await accountsApi().update(updatedAccount, token, signal);

      // Handle successful update, e.g., show a success message or navigate to another page
      alert('Account updated successfully');
    } catch (error) {
      console.error('Failed to update account:', error);
      alert('Failed to update account');
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonContent>
        <IonTitle>Update Account {account?.accountName}</IonTitle>
        {account && (
          <form onSubmit={handleUpdateAccount}>
            <IonInput
              readonly
              value={account.id}
              placeholder="Account ID"
            ></IonInput>
            <IonInput
              readonly
              value={account.userAccountId}
              placeholder="User Account ID"
            ></IonInput>
            <IonInput
              value={accountName}
              placeholder="Account Name"
              onIonChange={(e) => setAccountName(e.detail.value!)}
            ></IonInput>
            <IonInput
              type="number"
              value={initialValue}
              placeholder="Initial Value"
              onIonChange={(e) => setInitialValue(parseFloat(e.detail.value!))}
            ></IonInput>
            <IonInput
              type="number"
              value={currentValue}
              placeholder="Current Value"
              onIonChange={(e) => setCurrentValue(parseFloat(e.detail.value!))}
            ></IonInput>
            <IonInput
              value={accountType}
              placeholder="Account Type"
              onIonChange={(e) => setAccountType(e.detail.value!)}
            ></IonInput>
            <IonInput
              value={currency}
              placeholder="Currency"
              onIonChange={(e) => setCurrency(e.detail.value!)}
            ></IonInput>
            <IonButton type="submit">Update Account</IonButton>
            <IonButton type="button" onClick={handleCancel}>
              Cancel
            </IonButton>
          </form>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UpdateAccount;

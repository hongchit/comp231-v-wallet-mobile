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
import AccountType from '../../../models/AccountType';
import Currency from '../../../models/Currency';

const UpdateAccount: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const { returnURI } = useParams<{ returnURI: string }>();

  const [token, setToken] = useToken();
  const user = useUser();
  const history = useHistory();

  const [account, setAccount] = useState<FinancialAccount | null>(null);
  const [accountName, setAccountName] = useState('');
  const [initialValue, setInitialValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [accountType, setAccountType] = useState(AccountType.CASH);
  const [currency, setCurrency] = useState(Currency.CAD);

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
      if (!account) {
        return;
      }
      if (!accountName || !accountType || !currency) {
        alert('Please fill in all required fields');
        return;
      }
      const updatedAccount: FinancialAccount = {
        id: accountId,
        accountName,
        initialValue,
        currentValue,
        accountType,
        currency,
        userAccountId: account?.userAccountId || user.primarysid,
      };

      const signal = new AbortController().signal;
      await accountsApi().update(updatedAccount, token, signal);

      history.push(returnURI);
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
              readonly
              value={initialValue}
              placeholder="Initial Value"
              // onIonChange={(e) => setInitialValue(parseFloat(e.detail.value!))}
            ></IonInput>
            <IonInput
              readonly
              value={currentValue}
              placeholder="Current Value"
              // onIonChange={(e) => setCurrentValue(parseFloat(e.detail.value!))}
            ></IonInput>
            <div>
              <label>Account Type:</label>
              {Object.values(AccountType).map((type) => (
                <div key={type}>
                  <input
                    type="radio"
                    value={type}
                    checked={accountType === type}
                    onChange={() => setAccountType(type)}
                  />
                  <label>{type}</label>
                </div>
              ))}
            </div>
            <div>
              <label>Currency:</label>
              {Object.values(Currency).map((currency) => (
                <div key={currency}>
                  <input
                    type="radio"
                    value={currency}
                    checked={currency === currency}
                    onChange={() => setCurrency(currency)}
                  />
                  <label>{currency}</label>
                </div>
              ))}
            </div>
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

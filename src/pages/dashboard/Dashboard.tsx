import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonLoading,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AuthHelper from '../../hooks/AuthHelper';
import accountsApi from '../../hooks/accounts.api';

interface Account {
  accountName: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [accounts, setAccounts] = useState<Account[]>([]);
  // there are still some errors for fetching finance account information.
  useEffect(() => {
    const token = AuthHelper().isAuthenticated();
    console.log('Token:', token);
    if (!token) {
      // Redirect to login page if JWT session token is not found
      history.push('/login');
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    accountsApi()
      .list(token, signal)
      .then((accounts) => {
        setAccounts(accounts);
      })
      .catch((error) => {
        console.error('Error fetching accounts:', error);
        if (error.message === 'Unauthorized') {
          // Redirect to login page if token is invalid
          history.push('/login');
        }
      });

    return () => {
      // cancel the fetch on component unmount
      abortController.abort();
    };
  }, [history, accounts]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2> Welcome to V-Wallet</h2>
        <p>This is a static dashboard landing page.</p>
        <IonList>
          {accounts.map((account, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{account.accountName}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

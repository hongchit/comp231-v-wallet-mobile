import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonText,
  IonList,
  IonButton,
  IonAlert,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import { useGlobalState } from '../../global/global.state';
import { dashboardService } from '../dashboard//dashboard.service';

import { FinancialAccount as FAModel } from '../../models/financial-account.model';
import { FinancialTransaction } from '../../models/financial-transaction.model';

interface Transaction {
  date: string;
  description: string;
  amount: number;
}

interface AccountInfo {
  accountNumber: string;
  accountHolder: string;
  balance: number;
  transactions: Transaction[];
}

const FinancialAccount: React.FC = () => {
  const [userPresence] = useGlobalState('userPresence');
  const [financialAccountData, setFinancialAccounts] = useState<FAModel[] | []>(
    [],
  );
  const [financialTransactionsData, setFinancialTransactions] = useState<
    FinancialTransaction[]
  >([]);

  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    accountNumber: '',
    accountHolder: '',
    balance: 0,
    transactions: [],
  });
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Fetch account information from an API or use dummy data
    const fetchAccountInfo = async () => {
      // Replace with your actual API call
      const response = await fetch('http://localhost:5241/api/Account/info');
      const data = await response.json();

      setAccountInfo({
        accountNumber: data.accountNumber,
        accountHolder: data.accountHolder,
        balance: data.balance,
        transactions: data.transactions,
      });
    };

    //fetchAccountInfo();
  }, []);

  const fetchFinancialAccounts = async () => {
    try {
      if (!userPresence.profileId) {
        return;
      }

      const service = dashboardService(userPresence);
      var financialAccounts = await service.getFinancialAccounts();
      setFinancialAccounts(financialAccounts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFinancialTransactions = async () => {
    try {
      if (!userPresence.profileId) {
        return;
      }

      const service = dashboardService(userPresence);
      var financialTransactions = await service.getFinancialTransactions();
      setFinancialTransactions(financialTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFinancialAccounts();
    fetchFinancialTransactions();
  }, [userPresence]);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5241/api/Account/${accountInfo.accountNumber}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      // Handle successful deletion (e.g., redirect to another page)
      history.push('/some-other-page');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Financial Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          {financialAccountData &&
            financialAccountData.map((data, index) => {
              return (
                <IonCol key={index}>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{data.name}</IonCardTitle>
                      <IonCardSubtitle>
                        ${data.balance.toFixed(2)}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              );
            })}
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Transactions</IonCardTitle>
                <IonCardSubtitle>Last 7 Days</IonCardSubtitle>
              </IonCardHeader>
              <IonList lines="full">
                {financialTransactionsData.length === 0 ? (
                  <IonItem>
                    <IonLabel>No records found</IonLabel>
                  </IonItem>
                ) : (
                  financialTransactionsData.map((data, index) => {
                    return (
                      <IonItem key={index}>
                        <IonLabel>{data.categoryName}</IonLabel>
                        <IonLabel>${data.amount.toFixed(2)}</IonLabel>
                        <IonLabel>{data.type}</IonLabel>
                      </IonItem>
                    );
                  })
                )}
              </IonList>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton color="danger" onClick={() => setShowAlert(true)}>
              Delete Account
            </IonButton>
          </IonCol>
        </IonRow>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Confirm Delete'}
          message={'Are you sure you want to delete this account?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                setShowAlert(false);
              },
            },
            {
              text: 'Delete',
              handler: handleDeleteAccount,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default FinancialAccount;

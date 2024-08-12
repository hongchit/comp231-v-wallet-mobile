import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonAlert,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonRouterLink,
  IonButtons,
  IonIcon,
} from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useGlobalState } from '../../global/global.state';
import { FinancialTransaction } from '../../models/financial-transaction.model';
import { financeService } from '../../services/finance.service';
import AccountType from '../../models/AccountType';
import Currency from '../../models/Currency';

interface AccountInfo {
  accountId: string;
  accountNumber: string;
  accountName: string;
  initialBalance: number;
  currentBalance: number;
  accountType: string;
  currency: string;
  transactions: FinancialTransaction[];
}

const FinancialAccount: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [userPresence] = useGlobalState('userPresence');
  const location = useLocation();

  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    accountId: '',
    accountNumber: '',
    accountName: '',
    initialBalance: 0,
    currentBalance: 0,
    accountType: AccountType.CASH,
    currency: Currency.CAD,
    transactions: [],
  });
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loadFinancialData = async (accountId: string) => {
      if (!userPresence || !userPresence.profileId || !accountId) {
        setAccountInfo({
          accountId: '',
          accountNumber: '',
          accountName: '',
          initialBalance: 0,
          currentBalance: 0,
          accountType: AccountType.CASH,
          currency: Currency.CAD,
          transactions: [],
        });
        return;
      }
      const financialAccount = await financeService(
        userPresence,
      ).getFinancialAccount(accountId);
      const financialTransactions = await financeService(
        userPresence,
      ).getFinancialTransactionsByAccount(accountId);

      setAccountInfo({
        accountId: financialAccount?.id ?? '',
        accountNumber: financialAccount?.number ?? '',
        accountName: financialAccount?.name ?? '',
        initialBalance: financialAccount?.initialBalance ?? 0,
        currentBalance: financialAccount?.balance ?? 0,
        accountType: financialAccount?.type ?? AccountType.CASH,
        currency: financialAccount?.currency ?? Currency.CAD,
        transactions: financialTransactions,
      });
    };

    loadFinancialData(accountId);
  }, [accountId, location.pathname, userPresence]);

  const handleDeleteAccount = async () => {
    try {
      setShowAlert(false);
      const abortController = new AbortController();
      const signal = abortController.signal;

      const service = financeService(userPresence);
      await service.deleteFinancialAccount(accountId, signal);

      // Handle successful deletion (e.g., redirect to another page)
      history.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const navigateToUpdateAccount = () => {
    console.log('Nav: ', location.pathname);
    console.log('AccountInfo: ', accountInfo);
    history.push({
      pathname: `/financial-account/${accountInfo.accountId}/edit`,
      state: { returnURI: location.pathname },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton size="large">
              <IonRouterLink href="/">
                <IonIcon icon={chevronBackOutline}></IonIcon>
              </IonRouterLink>
            </IonButton>
          </IonButtons>
          <IonTitle>Financial Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol key={accountInfo.accountId}>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{accountInfo.accountName}</IonCardTitle>
                <IonCardSubtitle>
                  Account Type: {accountInfo.accountType}
                </IonCardSubtitle>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>Account Number</IonLabel>
                      <IonLabel>{accountInfo.accountNumber}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Currency</IonLabel>
                      <IonLabel>{accountInfo.currency}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Initial Balance</IonLabel>
                      <IonLabel>
                        ${accountInfo.initialBalance.toFixed(2)}
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Current Balance</IonLabel>
                      <IonLabel>
                        ${accountInfo.currentBalance.toFixed(2)}
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Transactions</IonCardTitle>
                <IonCardSubtitle>Last 7 Days</IonCardSubtitle>
              </IonCardHeader>
              <IonList lines="full">
                {accountInfo.transactions.length === 0 ? (
                  <IonItem>
                    <IonLabel>
                      No transactions available for this account
                    </IonLabel>
                  </IonItem>
                ) : (
                  accountInfo.transactions.map((data, index) => {
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
          <IonCol className="ion-text-center">
            <IonButton onClick={navigateToUpdateAccount}>
              Update Account
            </IonButton>
          </IonCol>
          <IonCol className="ion-text-center">
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

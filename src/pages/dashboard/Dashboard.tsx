import React, { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../../global/global.state';
import { dashboardService } from './dashboard.service';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonLabel,
  IonItemDivider,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { FinancialAccount } from '../../models/financial-account.model';
import { FinancialTransaction } from '../../models/financial-transaction.model';
import { add } from 'ionicons/icons';
import NewTransactionModal from '../finance/NewTransactionModal';
import { useHistory } from 'react-router';

const Dashboard: React.FC = () => {
  const [userPresence] = useGlobalState('userPresence');
  const [financialAccountData, setFinancialAccounts] = useState<
    FinancialAccount[] | []
  >([]);
  const [financialTransactionsData, setFinancialTransactions] = useState<
    FinancialTransaction[]
  >([]);
  const history = useHistory();

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

  const createNewTransaction = async (transaction: FinancialTransaction) => {
    try {
      if (!userPresence.profileId) {
        return;
      }
      const service = dashboardService(userPresence);
      await service.createFinancialTransaction(transaction);

      await fetchFinancialAccounts();
      await fetchFinancialTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userPresence.token === '') {
      return;
    }

    fetchFinancialAccounts();
    fetchFinancialTransactions();
  }, [userPresence]);

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const addTransactionClick = () => {
    setIsTransactionModalOpen(true);
  };

  const addAccountClick = async () => {
    //add the logic to add financial account here

    // Testing code to create a new account, to be removed after implementing create account UI
    const newAccount: FinancialAccount = {
      id: '',
      name: 'TD Savings',
      number: '0000000000',
      type: 'Savings',
      initialBalance: 0,
      balance: 0,
      currency: 'CAD',
    };
    const service = dashboardService(userPresence);
    await service.createFinancialAccount(newAccount, undefined);
    // End of Testing code
  };

  const getAccountDetails = (accountId: string) => {
    history.push(`/financial-account/${accountId}`);
  };

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItemDivider>
              <IonLabel>Accounts</IonLabel>
              <IonButton shape="round" onClick={addAccountClick}>
                <IonIcon slot="icon-only" icon={add}></IonIcon>
              </IonButton>
            </IonItemDivider>
          </IonCol>
        </IonRow>
        <IonRow>
          {financialAccountData && financialAccountData.length === 0 ? (
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Welcome to your V-Wallet</IonCardTitle>
                  <IonCardSubtitle>
                    Start by adding a new account
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          ) : (
            financialAccountData.map((data, index) => {
              return (
                <IonCol key={index}>
                  <IonCard onClick={() => getAccountDetails(data.id)}>
                    <IonCardHeader>
                      <IonCardTitle>{data.name}</IonCardTitle>
                      <IonCardSubtitle>
                        ${data.balance.toFixed(2)}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              );
            })
          )}
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
      </IonGrid>
      <>
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton onClick={addTransactionClick}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <NewTransactionModal
          isOpen={isTransactionModalOpen}
          accounts={financialAccountData}
          onClose={(newTransaction, isConfirm) => {
            setIsTransactionModalOpen(false);
            if (isConfirm) {
              createNewTransaction(newTransaction);
              return;
            }
          }}
        />
      </>
    </>
  );
};

export default Dashboard;

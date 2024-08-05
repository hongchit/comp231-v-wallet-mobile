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
} from '@ionic/react';
import { FinancialAccount } from '../../models/financial-account.model';
import { FinancialTransaction } from '../../models/financial-transaction.model';
import { add } from 'ionicons/icons';
import Transaction from '../finance/Transaction';

var financialAccounts: FinancialAccount[] = [];

const Dashboard: React.FC = () => {
  const [userPresence] = useGlobalState('userPresence');
  const [financialAccountData, setFinancialAccounts] = useState<
    FinancialAccount[] | null
  >(null);
  const [financialTransactions, setFinancialTransactions] = useState<
    FinancialTransaction[]
  >([]);

  const fetchFinancialAccounts = async () => {
    try {
      if (!userPresence.profileId) {
        return;
      }

      const service = dashboardService(userPresence);
      financialAccounts = await service.getFinancialAccounts();
      setFinancialAccounts(financialAccounts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFinancialTransactions = async () => {
    try {
      if (
        !userPresence.profileId ||
        (financialAccountData && financialAccountData.length === 0)
      ) {
        return;
      }

      const service = dashboardService(userPresence);
      const transactions = await service.getFinancialTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFinancialAccounts();
    fetchFinancialTransactions();
  }, [userPresence]);

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const addTransactionClick = () => {
    setIsTransactionModalOpen(true);
  };

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItemDivider>
              <IonLabel>Accounts</IonLabel>
            </IonItemDivider>
          </IonCol>
        </IonRow>
        <IonRow>
          {financialAccountData &&
            financialAccountData.map((data, index) => {
              return (
                <IonCol key={index}>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{data.name}</IonCardTitle>
                      <IonCardSubtitle>
                        {data.balance.toFixed(2)}
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
              <IonItemDivider />
              <IonList lines="full">
                {financialTransactions.length === 0 ? (
                  <IonItem>
                    <IonLabel>No records found</IonLabel>
                  </IonItem>
                ) : (
                  financialTransactions.map((data, index) => {
                    return (
                      <IonItem key={index}>
                        <IonLabel>{data.categoryName}</IonLabel>
                        <IonLabel>{data.amount}</IonLabel>
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
        <Transaction
          isOpen={isTransactionModalOpen}
          onClose={(data) => {
            var test = data;
            debugger;
            //call the save transaction here jc
            setIsTransactionModalOpen(false);
            fetchFinancialAccounts();
            fetchFinancialTransactions();
          }}
        />
      </>
    </>
  );
};

export default Dashboard;
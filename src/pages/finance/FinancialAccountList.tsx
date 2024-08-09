import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonRouterLink,
} from '@ionic/react';

interface Account {
  id: number;
  type: string;
  name: string;
  balance: number;
  accountNumber: string;
}

const mockAccounts: Account[] = [
  {
    id: 1,
    type: 'Checking',
    name: 'Main Checking',
    balance: 5000.0,
    accountNumber: '***1234',
  },
  {
    id: 2,
    type: 'Savings',
    name: 'Emergency Fund',
    balance: 10000.0,
    accountNumber: '***5678',
  },
  {
    id: 3,
    type: 'Credit Card',
    name: 'Rewards Card',
    balance: -1500.0,
    accountNumber: '***9012',
  },
  {
    id: 4,
    type: 'Investment',
    name: '401(k)',
    balance: 50000.0,
    accountNumber: '***3456',
  },
];

import { useGlobalState } from '../../global/global.state';
import { dashboardService } from '../dashboard//dashboard.service';

import { FinancialAccount as FAModel } from '../../models/financial-account.model';

const FinancialAccountsList: React.FC = () => {
  const [userPresence] = useGlobalState('userPresence');
  const [financialAccountData, setFinancialAccounts] = useState<FAModel[] | []>(
    [],
  );

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
  useEffect(() => {
    fetchFinancialAccounts();
  }, [userPresence]);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Your Financial Accounts</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow className="ion-text-weight-bold">
            <IonCol>Account Type</IonCol>
            <IonCol>Account Name</IonCol>
            <IonCol>Balance</IonCol>
            <IonCol>Account Number</IonCol>
          </IonRow>
          {financialAccountData &&
            financialAccountData.map((account) => (
              <IonRouterLink
                key={account.id}
                routerLink={`/financial-account`}
                style={{ textDecoration: 'none' }}
              >
                <IonRow>
                  <IonCol>{account.type}</IonCol>
                  <IonCol>{account.name}</IonCol>
                  <IonCol
                    className={
                      account.balance < 0
                        ? 'ion-color-danger'
                        : 'ion-color-success'
                    }
                  >
                    ${account.balance.toFixed(2)}
                  </IonCol>
                  <IonCol>{account.number}</IonCol>
                </IonRow>
              </IonRouterLink>
            ))}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default FinancialAccountsList;

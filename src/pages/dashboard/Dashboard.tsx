import React, { useEffect, useState } from 'react';
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
} from '@ionic/react';
import { FinancialAccount } from '../../models/financial-account.model';

var financialAccounts: FinancialAccount[] = [];

const Dashboard: React.FC = () => {
  const [userPresence] = useGlobalState('userPresence');
  const [financialAccountData, setFinancialAccounts] = useState<
    FinancialAccount[] | null
  >(null);

  useEffect(() => {
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

    fetchFinancialAccounts();
  }, [userPresence]);

  return (
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
                    <IonCardSubtitle>{data.balance.toFixed(2)}</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            );
          })}
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItemDivider>
            <IonLabel>Transactions</IonLabel>
          </IonItemDivider>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";

interface Account {
  accountName: string;
}

const Dashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
// there are still some errors for fetching finance account information. 
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:5241/api/Finance/transaction');
        const data = await response.json();
        if (data.success) {
          setAccounts(data.accounts);
        } else {
          alert('Failed to load accounts');
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
        //alert('Test: An error occurred while fetching accounts');
      }
    };

    fetchAccounts();
  }, []);

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

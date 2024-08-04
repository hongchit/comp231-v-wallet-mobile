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
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import { useGlobalState } from '../../global/global.state';

const Dashboard: React.FC = () => {
  const [userPresence] = useGlobalState('userPresence');
  // there are still some errors for fetching finance account information.
  useEffect(() => {
    // const fetchAccounts = async () => {
    //   try {
    //     const response = await fetch(
    //       'http://localhost:5241/api/finance/transaction',
    //     );
    //     const data = await response.json();
    //     if (data.success) {
    //       setAccounts(data.accounts);
    //     } else {
    //       alert('Failed to load accounts');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching accounts:', error);
    //   }
    // };
    // fetchAccounts();
  }, []);
  return (
    <>
      <h2> Welcome to V-Wallet {userPresence.name}</h2>
      <p>This is a static dashboard landing page.xxx</p>
    </>
  );
};

export default Dashboard;

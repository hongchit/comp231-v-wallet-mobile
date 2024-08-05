import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonDatetimeButton,
} from '@ionic/react';
import React, { useRef, useState } from 'react';
import { FinancialTransaction } from '../../models/financial-transaction.model';
import { FinancialAccount } from '../../models/financial-account.model';

interface TransactionModalProperties {
  isOpen: boolean;
  accounts: FinancialAccount[];
  onClose: (transaction: FinancialTransaction, isConfirm: boolean) => void;
}

const TransactionModal: React.FC<TransactionModalProperties> = ({
  isOpen,
  accounts,
  onClose,
}) => {
  const [newTransaction, setNewTransaction] = useState<FinancialTransaction>(
    new FinancialTransaction(),
  );
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  if (!isOpen) {
    return null;
  }

  function onModalClose(isConfirm: boolean) {
    onClose(newTransaction, isConfirm);
  }

  return (
    <>
      <IonModal
        isOpen={isOpen}
        ref={modal}
        trigger="open-modal"
        onDidDismiss={() => onClose(newTransaction, false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => onModalClose(false)}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>New Transaction</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => onModalClose(true)}>
                Accept
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonSelect
              label="Account"
              labelPlacement="floating"
              onIonChange={(e) => {
                const selectedAccount = accounts.find(
                  (x) => x.name === e.detail.value,
                );

                if (selectedAccount) {
                  setNewTransaction({
                    ...newTransaction,
                    accountId: selectedAccount.id,
                    accountName: selectedAccount.name,
                  });
                }
              }}
            >
              {accounts.map((account) => (
                <IonSelectOption key={account.id} value={account.name}>
                  {account.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput
              label="Enter the amount"
              labelPlacement="stacked"
              ref={input}
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onIonChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: parseFloat(e.detail.value!),
                })
              }
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Enter the description"
              labelPlacement="stacked"
              ref={input}
              type="text"
              placeholder="Description"
              value={newTransaction.description}
              onIonChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  description: e.detail.value!,
                })
              }
            />
          </IonItem>
          <IonItem>
            <IonSelect
              label="Transaction Type"
              labelPlacement="floating"
              onIonChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  type: e.detail.value,
                })
              }
            >
              <IonSelectOption value="Income">Income</IonSelectOption>
              <IonSelectOption value="Expense">Expense</IonSelectOption>
              <IonSelectOption value="Transfer">Transfer</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect
              label="Category"
              labelPlacement="floating"
              onIonChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  categoryName: e.detail.value,
                })
              }
            >
              <IonSelectOption value="Shopping">Shopping</IonSelectOption>
              <IonSelectOption value="Food">Food</IonSelectOption>
              <IonSelectOption value="Housing">Housing</IonSelectOption>
              <IonSelectOption value="Income">Income</IonSelectOption>
              <IonSelectOption value="Transportation">
                Transportation
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="datetime"
                presentation="date-time"
                value={
                  newTransaction.date
                    ? newTransaction.date.toISOString()
                    : new Date().toISOString()
                }
                formatOptions={{
                  date: {
                    weekday: 'short',
                    month: 'long',
                    day: '2-digit',
                  },
                  time: {
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                }}
                onIonChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    date: new Date(e.detail.value as string),
                  })
                }
              ></IonDatetime>
            </IonModal>
          </IonItem>
        </IonContent>
      </IonModal>
    </>
  );
};

export default TransactionModal;

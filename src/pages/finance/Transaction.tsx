import {
  IonModalCustomEvent,
  OverlayEventDetail,
} from '@ionic/core/components';
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
} from '@ionic/react';
import React, { useRef, useState } from 'react';
import { FinancialTransaction } from '../../models/financial-transaction.model';

interface TransactionModalProperties {
  isOpen: boolean;
  onClose: (transaction: FinancialTransaction) => void;
}

const TransactionModal: React.FC<TransactionModalProperties> = ({
  isOpen,
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

  function onAcceptClick() {
    modal.current?.dismiss(input.current?.value, 'confirm');
    onClose(newTransaction);
  }

  return (
    <>
      <IonModal
        isOpen={isOpen}
        ref={modal}
        trigger="open-modal"
        onDidDismiss={() => onClose(newTransaction)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>Welcome</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => onAcceptClick()}>
                Accept
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
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
            <IonLabel>Transaction Type</IonLabel>
            <IonSelect
              value={newTransaction.type}
              placeholder=""
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
            <IonLabel>Category</IonLabel>
            <IonSelect
              value={newTransaction.categoryName}
              placeholder=""
              onIonChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  type: e.detail.value,
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
            <IonDatetime
              value={new Date().toISOString()}
              onIonChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  date: e.detail.value
                    ? new Date(e.detail.value[0])
                    : newTransaction.date,
                })
              }
            ></IonDatetime>
          </IonItem>
        </IonContent>
      </IonModal>
    </>
  );
};

export default TransactionModal;

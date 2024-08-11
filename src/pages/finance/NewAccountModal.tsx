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
  IonSelect,
  IonSelectOption,
  useIonAlert,
} from '@ionic/react';
import React, { useRef, useState } from 'react';
import { FinancialAccount } from '../../models/financial-account.model';
import { useGlobalState } from '../../global/global.state';
import AccountType from '../../models/AccountType';
import Currency from '../../models/Currency';
import { trim } from 'lodash';

interface TransactionModalProperties {
  isOpen: boolean;
  onClose: (account: FinancialAccount, isConfirm: boolean) => void;
}

interface FormData {
  accountNumber: string;
  accountName: string;
  accountType: string;
  currency: string;
}

const NewAccountModal: React.FC<TransactionModalProperties> = ({
  isOpen,
  onClose,
}) => {
  const [userPresence] = useGlobalState('userPresence');
  const [newAccount, setNewAccount] = useState<FinancialAccount>(
    new FinancialAccount(),
  );
  const modal = useRef<HTMLIonModalElement>(null);

  const [formData, setFormData] = useState<FormData>({
    accountNumber: '',
    accountName: '',
    accountType: AccountType.CASH,
    currency: Currency.CAD,
  });
  const [presentAlert] = useIonAlert();

  if (!isOpen) {
    return null;
  }

  function onModalClose(isConfirm: boolean) {
    if (isConfirm) {
      // Validation
      if (!validateForm()) {
        return;
      }
      newAccount.initialBalance = 0;
      newAccount.balance = 0;
      newAccount.name = formData.accountName;
      newAccount.number = formData.accountNumber;
      newAccount.type = formData.accountType;
      newAccount.currency = formData.currency;
    }
    onClose(newAccount, isConfirm);
  }

  const validateForm = (): boolean => {
    // Check if account name is empty
    if (
      !validateMandatory(
        'Account Name',
        formData.accountName,
        'Please enter a name for the account',
      )
    ) {
      return false;
    }
    // Check if account number is empty
    if (
      !validateMandatory(
        'Account Number',
        formData.accountNumber,
        'Please enter a number for the account',
      )
    ) {
      return false;
    }
    return true;
  };
  const validateMandatory = (
    fieldName: string,
    value: string,
    message: string,
  ): boolean => {
    if (!value || trim(value) === '') {
      presentAlert({
        header: `${fieldName} is required`,
        message: message,
        buttons: ['OK'],
      });
      return false;
    }
    return true;
  };

  return (
    <>
      <IonModal
        isOpen={isOpen}
        ref={modal}
        trigger="open-modal"
        onDidDismiss={() => onClose(newAccount, false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => onModalClose(false)}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>New Account</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => onModalClose(true)}>Save</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonInput
              label="Enter Account Name"
              labelPlacement="stacked"
              type="text"
              value={formData.accountName}
              placeholder="Account Name"
              onIonChange={(e) =>
                setFormData({
                  ...formData,
                  accountName: e.detail.value ?? '',
                })
              }
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Enter Account Number"
              labelPlacement="stacked"
              type="text"
              value={formData.accountNumber}
              placeholder="Account Number"
              onIonChange={(e) =>
                setFormData({
                  ...formData,
                  accountNumber: e.detail.value ?? '',
                })
              }
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect
              label="Account Type"
              labelPlacement="floating"
              value={formData.accountType}
              onIonChange={(e) =>
                setFormData({
                  ...formData,
                  accountType: e.detail.value as AccountType,
                })
              }
            >
              {Object.values(AccountType)
                .filter((value) => typeof value === 'string')
                .map((type) => (
                  <IonSelectOption key={type} value={type}>
                    {type}
                  </IonSelectOption>
                ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect
              label="Currency"
              labelPlacement="floating"
              value={formData.currency}
              onIonChange={(e) =>
                setFormData({
                  ...formData,
                  currency: e.detail.value,
                })
              }
            >
              {Object.values(Currency)
                .filter((value) => typeof value === 'string')
                .map((currency) => (
                  <IonSelectOption
                    key={currency.toString()}
                    value={currency.toString()}
                  >
                    {currency.toString()}
                  </IonSelectOption>
                ))}
            </IonSelect>
          </IonItem>
        </IonContent>
      </IonModal>
    </>
  );
};

export default NewAccountModal;

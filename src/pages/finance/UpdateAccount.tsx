import React, { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../../global/global.state';
import { financeService } from '../../services/finance.service';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  IonButton,
  IonContent,
  IonPage,
  IonInput,
  IonTitle,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  IonHeader,
  IonRow,
  IonCol,
  useIonAlert,
} from '@ionic/react';
import { FinancialAccount } from '../../models/financial-account.model';
import AccountType from '../../models/AccountType';
import Currency from '../../models/Currency';
import { trim } from 'lodash';

interface FormData {
  accountId: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  currency: string;
}

/**
 * UpdateAccount component, responsible for updating a financial account.
 */
const UpdateAccount: React.FC = () => {
  const location = useLocation();
  const { accountId } = useParams<{ accountId: string }>();

  const history = useHistory();
  const [userPresence] = useGlobalState('userPresence');
  const [returnURI, setReturnURI] = useState<string>('');
  const [account, setAccount] = useState<FinancialAccount>(
    new FinancialAccount(),
  );
  const [formData, setFormData] = useState<FormData>({
    accountId: '',
    accountNumber: '',
    accountName: '',
    accountType: AccountType.CASH,
    currency: Currency.CAD,
  });
  const [presentAlert] = useIonAlert();

  // Fetch account data
  useEffect(() => {
    // Get Return URI from location state
    try {
      const r = (location.state as any).returnURI as string;
      setReturnURI(r);
    } catch (error) {}

    if (!userPresence || !userPresence.profileId || !accountId) {
      setFormData({
        accountId: '',
        accountNumber: '',
        accountName: '',
        accountType: AccountType.CASH,
        currency: Currency.CAD,
      });
      return;
    }
    const abortController = new AbortController();
    const signal = abortController.signal;
    const service = financeService(userPresence);

    const fetchAccount = async () => {
      try {
        const fetchedAccount = await service.getFinancialAccount(
          accountId,
          signal,
        );
        setAccount(fetchedAccount ?? new FinancialAccount());
        setFormData({
          accountId: fetchedAccount?.id ?? '',
          accountNumber: fetchedAccount?.number ?? '',
          accountName: fetchedAccount?.name ?? '',
          accountType: fetchedAccount?.type ?? AccountType.CASH,
          currency: fetchedAccount?.currency ?? Currency.CAD,
        });
      } catch (error) {
        console.error('Failed to fetch account:', error);
      }
    };
    fetchAccount();

    return () => {
      abortController.abort();
    };
  }, [accountId, location.pathname, userPresence]);

  // Validate form data
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

  // Update account
  const handleUpdateAccount = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const service = financeService(userPresence);
    try {
      if (!account) {
        return;
      }
      // Validate form data
      if (!validateForm()) {
        return;
      }

      // Convert form data to account object
      const toUpdate: FinancialAccount = {
        ...account,
        name: formData.accountName,
        number: formData.accountNumber,
        type: formData.accountType,
        currency: formData.currency,
      };
      console.log('Updating account:', toUpdate);
      await service.updateFinancialAccount(toUpdate, signal);

      navigateBack();
    } catch (error) {
      abortController.abort();
      console.error('Failed to update account:', error);
      presentAlert({
        header: 'Failed to update account',
        message: (error as Error).message,
        buttons: ['OK'],
      });
    }
  };

  // Finished updating account, navigate back
  const navigateBack = () => {
    if (returnURI) {
      history.push({
        pathname: returnURI,
        state: { lastChange: new Date().toString() },
      });
    } else {
      history.goBack();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Update Account {account?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {account && (
          <>
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
            <IonRow>
              <IonCol className="ion-text-center">
                <IonButton color="primary" onClick={handleUpdateAccount}>
                  Update Account
                </IonButton>
              </IonCol>
              <IonCol className="ion-text-center">
                <IonButton color="warning" onClick={navigateBack}>
                  Cancel
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UpdateAccount;

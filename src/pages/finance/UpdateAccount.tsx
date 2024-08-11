import React, { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../../global/global.state';
import { financeService } from '../../services/finance.service';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  IonButton,
  IonIcon,
  IonAlert,
  IonContent,
  IonPage,
  IonInput,
  IonTitle,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonRow,
  IonCol,
} from '@ionic/react';
import { FinancialAccount } from '../../models/financial-account.model';
import AccountType from '../../models/AccountType';
import Currency from '../../models/Currency';
import { set } from 'lodash';
import { use } from 'chai';

interface FormData {
  accountId: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  currency: string;
}

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

  useEffect(() => {
    // Get Return URI from location state
    const r = (location.state as any).returnURI as string;
    setReturnURI(r);

    if (!userPresence || !userPresence.profileId || !accountId) {
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
  }, [accountId, userPresence]);

  const handleUpdateAccount = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const service = financeService(userPresence);
    try {
      if (!account) {
        return;
      }
      if (
        !formData.accountName ||
        !formData.accountType ||
        !formData.currency
      ) {
        alert('Please fill in all required fields');
        return;
      }
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

      console.log('Success: returnURI:', returnURI);
    } catch (error) {
      abortController.abort();
      console.error('Failed to update account:', error);
      alert('Failed to update account');
    }
  };

  const navigateBack = () => {
    console.log('Done. returnURI:', returnURI);
    if (returnURI) {
      history.push(returnURI);
    } else {
      history.goBack();
    }
  };

  const handleCancel = () => {
    navigateBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Update Account {account?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {account && (
          <form onSubmit={handleUpdateAccount}>
            <IonItem>
              <IonInput
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
                <IonButton color="warning" onClick={handleCancel}>
                  Cancel
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UpdateAccount;

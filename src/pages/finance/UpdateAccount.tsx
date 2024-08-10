import React, { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../../global/global.state';
import { financeService } from './finance.service';
import { useHistory, useParams } from 'react-router-dom';
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
} from '@ionic/react';
import { FinancialAccount } from '../../models/financial-account.model';
import AccountType from '../../models/AccountType';
import Currency from '../../models/Currency';

const UpdateAccount: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const { returnURI } = useParams<{ returnURI: string }>();

  const [userPresence] = useGlobalState('userPresence');
  const [account, setAccount] = useState<FinancialAccount>(
    new FinancialAccount(),
  );
  const history = useHistory();
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(0);
  const [accountType, setAccountType] = useState<AccountType>(AccountType.CASH);
  const [currency, setCurrency] = useState<Currency>(Currency.CAD);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const service = financeService(userPresence);

    const fetchAccount = async () => {
      try {
        const fetchedAccount = await service.getFinancialAccount(
          accountId,
          signal,
        );
        setAccount(fetchedAccount);
        setAccountName(fetchedAccount.name);
        setAccountNumber(fetchedAccount.number);
        setBalance(fetchedAccount.balance);
        setAccountType(AccountType.parse(fetchedAccount.type));
        setCurrency(Currency.parse(fetchedAccount.currency));
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
      if (!accountName || !accountType || !currency) {
        alert('Please fill in all required fields');
        return;
      }
      const updatedAccount: FinancialAccount = {
        id: accountId,
        name: accountName,
        number: accountNumber,
        initialBalance: account.initialBalance,
        balance: balance,
        type: accountType,
        currency: currency,
      };

      await service.updateFinancialAccount(updatedAccount, signal);

      history.push(returnURI);
    } catch (error) {
      abortController.abort();
      console.error('Failed to update account:', error);
      alert('Failed to update account');
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonContent>
        <IonTitle>Update Account {account?.name}</IonTitle>
        {account && (
          <form onSubmit={handleUpdateAccount}>
            <IonItem>
              <IonInput
                value={accountName}
                placeholder="Account Name"
                onIonChange={(e) => setAccountName(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                value={accountNumber}
                placeholder="Account Number"
                onIonChange={(e) => setAccountName(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonSelect
                label="Account Type"
                value={accountType}
                onIonChange={(e) =>
                  setAccountType(e.detail.value as AccountType)
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
                onIonChange={(e) => setCurrency(e.detail.value)}
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
            <IonButtons>
              <IonButton type="submit">Update Account</IonButton>
              <IonButton type="button" onClick={handleCancel}>
                Cancel
              </IonButton>
            </IonButtons>
          </form>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UpdateAccount;

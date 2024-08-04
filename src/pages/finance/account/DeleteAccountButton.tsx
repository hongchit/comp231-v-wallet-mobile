import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonIcon, IonAlert } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import accountsApi from '../../../hooks/accounts.api';
import { useUser } from '../../../hooks/useUser';
import { useToken } from '../../../hooks/useToken';

interface DeleteAccountButtonProps {
  accountId: string;
  redirectURI: string;
}

export default function DeleteAccountButton(
  props: DeleteAccountButtonProps,
): JSX.Element | null {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [token, setToken] = useToken();
  const user = useUser();
  const history = useHistory();

  const clickButton = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      const abortController = new AbortController();
      const signal = abortController.signal;

      const response = await accountsApi().remove(
        props.accountId,
        token as string,
        signal,
      );
      console.log('Delete response:', response);
      setRedirect(true);
    } catch (error) {
      console.error('Delete error:', error);
      alert(
        'An error occurred while deleting the account. Please try again later.',
      );
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (redirect) {
    history.push(props.redirectURI);
  }

  return (
    <div>
      <IonButton onClick={clickButton} color="danger">
        <IonIcon slot="icon-only" icon={trashOutline} />
      </IonButton>
      <IonAlert
        isOpen={open}
        onDidDismiss={handleCancel}
        header={'Delete Account'}
        message={'Confirm to delete the financial account?'}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: handleCancel,
          },
          {
            text: 'Confirm',
            cssClass: 'danger',
            handler: handleDelete,
          },
        ]}
      />
    </div>
  );
}

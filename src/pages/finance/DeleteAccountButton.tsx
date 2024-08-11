import React, { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../../global/global.state';
import { financeService } from '../../services/finance.service';
import { useHistory } from 'react-router-dom';
import { IonButton, IonIcon, IonAlert, IonItem } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { FinancialAccount } from '../../models/financial-account.model';
import { use } from 'chai';
import { set } from 'lodash';

interface DeleteAccountButtonProps {
  accountId: string;
  redirectURI: string;
  showIcon: boolean;
  label?: string;
}

const DeleteAccountButton: React.FC<DeleteAccountButtonProps> = (props) => {
  const [userPresence] = useGlobalState('userPresence');
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const deleteLabel = props.label || props.showIcon ? '' : 'Delete';

  const clickButton = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (redirect) {
      history.push(props.redirectURI);
    }

    return () => {
      setOpen(false);
    };
  }, [redirect]);

  const handleDelete = async () => {
    try {
      setOpen(false);

      const abortController = new AbortController();
      const signal = abortController.signal;

      const service = financeService(userPresence);
      await service.deleteFinancialAccount(props.accountId, signal);

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

  return (
    <IonItem>
      <IonButton onClick={clickButton} color="danger">
        {props.showIcon && <IonIcon slot="icon-only" icon={trashOutline} />}
        {deleteLabel && deleteLabel}
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
    </IonItem>
  );
};

export default DeleteAccountButton;

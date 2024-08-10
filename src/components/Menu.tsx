import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { menuController } from '@ionic/core/components';

import { useHistory } from 'react-router-dom';
import { logOut, mailOutline, mailSharp } from 'ionicons/icons';
import './Menu.css';
import { useGlobalState } from '../global/global.state';
import authHelper from '../helpers/auth.helper';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
];

const Menu: React.FC = () => {
  const history = useHistory();

  const [userPresence] = useGlobalState('userPresence');

  const handleLogout = () => {
    authHelper.logoutUser();
    menuController.close();
    history.push('/login');
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{userPresence.name}</IonListHeader>
          <IonNote>{userPresence.email}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className="selected"
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="other-list">
          <IonItem lines="none">
            <IonIcon slot="start" icon={logOut} />
            <IonButton
              fill="clear"
              className="logout-button"
              onClick={handleLogout}
              href="/login"
            >
              Logout
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

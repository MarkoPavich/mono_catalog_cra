import React from 'react';
import './NavbarResponsiveUserMenu.css';
import { withNamespaces } from 'react-i18next';
import { useAuthStore } from '../../../StoreProvider';
import UserMenuSmallScreen from './UserMenuSmallScreen';

function NavbarResponsiveUserMenu({ isSmallScreen, t }) {
  const { requestLogout, authState } = useAuthStore();

  const UserMenu = () => (
    <div className="l-navbar-user-menu">
      <ul>
        <li>
          <a href="/#/add-new-vehicle">{t('navOptions.addVehicle')}</a>
        </li>
        <li>
          <a href="/#/my-vehicles">{t('navOptions.myVehicles')}</a>
        </li>
        <li onClick={requestLogout}>{t('common.logout')}</li>
      </ul>
    </div>
  );

  if (!authState.isAuthenticated) return <></>;
  return isSmallScreen ? <UserMenuSmallScreen /> : <UserMenu />;
}

export default withNamespaces()(NavbarResponsiveUserMenu);

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
        <li>{t('navOptions.myVehicles')}</li>
        <li onClick={requestLogout}>{t('common.logout')}</li>
      </ul>
    </div>
  );

  if (!authState.isAuthenticated) return <></>;
  return isSmallScreen ? <UserMenuSmallScreen /> : <UserMenu />;
}

function toggleMobileMenu() {
  const activeClassName = 'l-navbar-user-menu-mobile mobile-menu-active';
  const inactiveClassName = 'l-navbar-user-menu-mobile';
  const toggleElem = document.querySelector('#l-navbar-user-menu-mobile');

  if (toggleElem.className === activeClassName)
    toggleElem.className = inactiveClassName;
  else toggleElem.className = activeClassName;
}

export default withNamespaces()(NavbarResponsiveUserMenu);

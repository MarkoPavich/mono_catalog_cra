import React from 'react';
import { observer } from 'mobx-react-lite';
import { withNamespaces } from 'react-i18next';
import { useAuthStore, useUIStore } from '../../../StoreProvider';

const UserMenuSmallScreen = observer(({ t }) => {
  const { requestLogout } = useAuthStore();
  const { navbarMobileMenu, toggleNavbarMenu } = useUIStore();

  return (
    <div
      onClick={toggleNavbarMenu}
      className={navbarMobileMenu}
      id="l-navbar-user-menu-mobile"
    >
      <ul className="l-navbar-mobile-menu-hamburger-icon">
        <li />
        <li />
        <li />
      </ul>
      <div className="l-navbar-user-mobile-svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-42 0 512 512">
          <path d="m210.4 246.6c33.9 0 63.2-12.2 87.2-36.1 24-24 36.1-53.3 36.1-87.2 0-33.9-12.2-63.2-36.1-87.2-24-24-53.3-36.1-87.2-36.1-33.9 0-63.2 12.2-87.2 36.1s-36.1 53.3-36.1 87.2c0 33.9 12.2 63.2 36.1 87.2 24 24 53.3 36.1 87.2 36.1zm0 0" />
          <path d="m426.1 393.7c-0.7-10-2.1-20.9-4.1-32.4-2.1-11.6-4.8-22.5-8-32.5-3.3-10.3-7.8-20.6-13.4-30.3-5.8-10.2-12.6-19-20.2-26.3-8-7.6-17.7-13.7-29-18.2-11.2-4.4-23.7-6.7-37-6.7-5.2 0-10.3 2.1-20 8.5-6 3.9-13 8.4-20.9 13.5-6.7 4.3-15.8 8.3-27 11.9-10.9 3.5-22.1 5.3-33 5.3-11 0-22.1-1.8-33-5.3-11.2-3.6-20.3-7.6-27-11.9-7.8-5-14.8-9.5-20.9-13.5-9.7-6.4-14.8-8.5-20-8.5-13.3 0-25.7 2.3-37 6.7-11.3 4.5-21 10.6-29 18.2-7.6 7.3-14.4 16.1-20.2 26.3-5.6 9.8-10.1 20-13.4 30.3-3.2 10-5.9 20.9-8 32.5-2.1 11.5-3.5 22.4-4.1 32.4-0.7 9.8-1 20-1 30.2 0 26.7 8.5 48.4 25.3 64.3 16.5 15.7 38.4 23.7 65.1 23.7h246.5c26.6 0 48.5-8 65.1-23.7 16.8-15.9 25.3-37.6 25.3-64.3 0-10.3-0.4-20.5-1-30.2zm0 0" />
        </svg>
      </div>
      <div className="l-navbar-user-mobile-popup-menu">
        <ul>
          <li>
            <a href="/#/add-new-vehicle">{t('navOptions.addVehicle')}</a>
          </li>
          <li>
            <a href="#">{t('navOptions.myVehicles')}</a>
          </li>
        </ul>
        <ul>
          <li onClick={requestLogout}>
            <a href="#">{t('common.logout')}</a>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default withNamespaces()(UserMenuSmallScreen);

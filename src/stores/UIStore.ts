import { makeObservable, observable, action, computed } from 'mobx';
import i18n from '../i18n';
import { Dict } from '../types';

class UIStore {
  availableTranslations: Dict;
  navbarMobileMenuClasses: Dict;
  sidebarmenuClasses: Dict;
  lang: string;
  screenWidth: number;
  navbarMobileMenu: string;
  sidebarFiltersMenu: string;

  constructor() {
    // TODO - maybe define this programmatically
    this.availableTranslations = {
      hr: 'hr',
      en: 'en',
      de: 'de',
    };

    // get lang setup from localStorage (either user selection or browser detected)
    // or default to hr
    this.lang =
      localStorage.getItem('i18nextLng') || this.availableTranslations.hr;

    // init screenWidth, used for some layout triggers
    this.screenWidth = window.innerWidth;

    // toggleables
    this.navbarMobileMenuClasses = {
      active: 'l-navbar-user-menu-mobile mobile-menu-active',
      inactive: 'l-navbar-user-menu-mobile',
    };

    this.sidebarmenuClasses = {
      active:
        'c-filtersSidebar-filter-params-container c-filtersSidebar-modal-active',
      inactive: 'c-filtersSidebar-filter-params-container',
    };

    // Navbar toggleable
    this.navbarMobileMenu = this.navbarMobileMenuClasses.inactive;
    // sidebar filters menu
    this.sidebarFiltersMenu = this.sidebarmenuClasses.inactive;

    // MOBX decorators
    makeObservable(this, {
      lang: observable,
      screenWidth: observable,
      navbarMobileMenu: observable,
      sidebarFiltersMenu: observable,

      switchLocale: action,
      setScreenWidth: action,
      toggleNavbarMenu: action,
      toggleSidebarMenu: action,
      closeSidebarMenu: action,

      carsGridSmallScreen: computed,
      navbarSmallScreen: computed,
    });
  }

  toggleSidebarMenu = () => {
    this.sidebarFiltersMenu = this.sidebarmenuClasses.active;
  };

  closeSidebarMenu = () => {
    this.sidebarFiltersMenu = this.sidebarmenuClasses.inactive;
  };

  toggleNavbarMenu = () => {
    this.navbarMobileMenu =
      this.navbarMobileMenu === this.navbarMobileMenuClasses.inactive
        ? this.navbarMobileMenuClasses.active
        : this.navbarMobileMenuClasses.inactive;
  };

  // Handle language switching, fallback to hr just in case..
  switchLocale = (lang: string) => {
    const locale =
      this.availableTranslations[lang] || this.availableTranslations.hr;
    this.lang = locale;
    i18n.changeLanguage(locale);
    localStorage.setItem('i18nextLng', locale); // store lang preference
  };

  setScreenWidth = (width: number) => {
    this.screenWidth = width;
  };

  // TODO - maybe define these values in some config, instead of hardcoding
  get carsGridSmallScreen() {
    return this.screenWidth < 950;
  }

  get navbarSmallScreen() {
    return this.screenWidth < 1500;
  }
}

export default UIStore;

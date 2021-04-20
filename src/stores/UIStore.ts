import { makeObservable, observable, action, computed } from 'mobx';
import i18n from '../i18n';
import { Dict } from '../types';

class UIStore {
  // TODO - maybe define this programmatically
  availableTranslations: Dict = {
    hr: 'hr',
    en: 'en',
    de: 'de',
  };

  // toggleables
  navbarMobileMenuClasses: Dict = {
    active: 'l-navbar-user-menu-mobile mobile-menu-active',
    inactive: 'l-navbar-user-menu-mobile',
  };
  sidebarmenuClasses: Dict = {
    active:
      'c-filtersSidebar-filter-params-container c-filtersSidebar-modal-active',
    inactive: 'c-filtersSidebar-filter-params-container',
  };

  // get lang setup from localStorage (either user selection or browser detected)
  // or default to hr
  @observable lang =
    localStorage.getItem('i18nextLng') || this.availableTranslations.hr;

  @observable screenWidth = window.innerWidth;

  // Navbar toggleable
  @observable navbarMobileMenu = this.navbarMobileMenuClasses.inactive;
  // sidebar filters menu
  @observable sidebarFiltersMenu = this.sidebarmenuClasses.inactive;

  constructor() {
    // Enable MOBX
    makeObservable(this);
  }

  @action
  toggleSidebarMenu = () => {
    this.sidebarFiltersMenu = this.sidebarmenuClasses.active;
  };

  @action
  closeSidebarMenu = () => {
    this.sidebarFiltersMenu = this.sidebarmenuClasses.inactive;
  };

  @action
  toggleNavbarMenu = () => {
    this.navbarMobileMenu =
      this.navbarMobileMenu === this.navbarMobileMenuClasses.inactive
        ? this.navbarMobileMenuClasses.active
        : this.navbarMobileMenuClasses.inactive;
  };

  // Handle language switching, fallback to hr just in case..
  @action
  switchLocale = (lang: string) => {
    const locale =
      this.availableTranslations[lang] || this.availableTranslations.hr;
    this.lang = locale;
    i18n.changeLanguage(locale);
    localStorage.setItem('i18nextLng', locale); // store lang preference
  };

  @action
  setScreenWidth = (width: number) => {
    this.screenWidth = width;
  };

  // TODO - maybe define these values in some config, instead of hardcoding
  @computed
  get carsGridSmallScreen() {
    return this.screenWidth < 950;
  }

  @computed
  get navbarSmallScreen() {
    return this.screenWidth < 1500;
  }
}

export default UIStore;

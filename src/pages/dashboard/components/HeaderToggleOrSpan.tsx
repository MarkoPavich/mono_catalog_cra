import { useTranslation } from 'react-i18next';
import { useUIStore } from '../../../StoreProvider';

function HeaderToggleOrSpan({
  smallScreen,
  resCount,
  activeFilters,
}: {
  smallScreen: boolean;
  resCount: number;
  activeFilters: number;
}) {
  const { toggleSidebarMenu } = useUIStore();
  const { t } = useTranslation();

  const Toggle = (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={toggleSidebarMenu}
      onClick={toggleSidebarMenu}
      className="c-carsGrid-filters-mobile-toggle"
    >
      <div className="c-carsGrid-hamburger-ico">
        <ul>
          <li />
          <li />
          <li />
        </ul>
      </div>
      <span>{t('carsGrid.filtersToggle')}</span>
      <div>
        <span>{activeFilters}</span>
      </div>
    </div>
  );

  const element = smallScreen ? (
    Toggle
  ) : (
    <span>
      {t('carsGrid.hitsCount')}: {resCount}
    </span>
  );

  return element;
}

export default HeaderToggleOrSpan;

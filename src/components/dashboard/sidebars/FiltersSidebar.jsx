import React from 'react';
import { observer } from 'mobx-react-lite';
import { withNamespaces } from 'react-i18next';
import { nanoid } from 'nanoid';
import { useVehiclesStore, useUIStore } from '../../../StoreProvider';
import './FiltersSidebar.css';

const SideFilters = observer(({ t }) => {
  const { sidebarFiltersMenu, closeSidebarMenu } = useUIStore();
  const {
    carMakes,
    carBodies,
    fuelTypes,
    filters,
    setBodyParams,
    setFuelParams,
    setMakeParam,
  } = useVehiclesStore();

  return (
    <aside
      className={sidebarFiltersMenu}
      id="c-filtersSidebar-filter-params-container"
    >
      <button type="button" onClick={closeSidebarMenu}>
        X
      </button>
      <div className="c-filtersSidebar-filters-unit-container">
        <span>{t('dashboardFilters.make')}</span>
        <select
          value={filters.makeParam}
          onChange={setMakeParam}
          name="brand_filter"
          id="brand_filter"
        >
          <option value="">--</option>
          {Object.keys(carMakes).map((key) => (
            <option key={nanoid()} value={carMakes[key].name}>
              {carMakes[key].name}
            </option>
          ))}
        </select>
      </div>
      <div className="c-filtersSidebar-filters-unit-container">
        <span>{t('dashboardFilters.fuel')}</span>
        <ul>
          {Object.keys(fuelTypes).map((fuelKey) => (
            <li key={nanoid()}>
              <input
                id={fuelTypes[fuelKey]}
                name={fuelTypes[fuelKey]}
                type="checkbox"
                checked={filters.fuelParams[fuelKey]}
                onChange={setFuelParams}
              />
              <label htmlFor={fuelTypes[fuelKey]}>
                {t(`vehicleParams.${fuelTypes[fuelKey]}`)}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="c-filtersSidebar-filters-unit-container">
        <span>{t('dashboardFilters.body')}</span>
        <ul>
          {Object.keys(carBodies).map((bodyKey) => (
            <li key={nanoid()}>
              <input
                id={carBodies[bodyKey]}
                name={carBodies[bodyKey]}
                checked={filters.bodyParams[bodyKey]}
                type="checkbox"
                onChange={setBodyParams}
              />
              <label htmlFor={carBodies[bodyKey]}>
                {t(`vehicleParams.${carBodies[bodyKey]}`)}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="c-filtersSidebar-mobile-confirm-button-box">
        <button type="submit" onClick={closeSidebarMenu}>
          Potvrdi
        </button>
      </div>
    </aside>
  );
});

export default withNamespaces()(SideFilters);

import React from 'react';
import { observer } from 'mobx-react-lite';
import { withNamespaces } from 'react-i18next';
import { nanoid } from 'nanoid';
import { useDashboardStore, useUIStore } from '../../../StoreProvider';
import './FiltersSidebar.css';

const SideFilters = observer(({ t }) => {
  const { sidebarFiltersMenu, closeSidebarMenu } = useUIStore();
  const {
    carsData,
    filters,
    setBodyParams,
    setFuelParams,
    setMakeParam,
  } = useDashboardStore();

  const { carMakes, carBodies, fuelTypes } = carsData;

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
          {Object.keys(carMakes)
            .sort((a, b) => (carMakes[a].name > carMakes[b].name ? 1 : -1))
            .map((key) => (
              <option key={nanoid()} value={carMakes[key].id}>
                {carMakes[key].name}
              </option>
            ))}
        </select>
      </div>
      <div className="c-filtersSidebar-filters-unit-container">
        <span>{t('dashboardFilters.fuel')}</span>
        <ul>
          {Object.keys(fuelTypes).map((key) => (
            <li key={nanoid()}>
              <input
                id={fuelTypes[key].id}
                name={fuelTypes[key].name}
                type="checkbox"
                checked={filters.fuelParams[fuelTypes[key].name]}
                onChange={setFuelParams}
              />
              <label htmlFor={fuelTypes[key].id}>
                {t(`vehicleParams.${fuelTypes[key].name}`)}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="c-filtersSidebar-filters-unit-container">
        <span>{t('dashboardFilters.body')}</span>
        <ul>
          {Object.keys(carBodies).map((key) => (
            <li key={nanoid()}>
              <input
                id={carBodies[key].id}
                name={carBodies[key].name}
                checked={filters.bodyParams[carBodies[key].name]}
                type="checkbox"
                onChange={setBodyParams}
              />
              <label htmlFor={carBodies[key].id}>
                {t(`vehicleParams.${carBodies[key].name}`)}
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

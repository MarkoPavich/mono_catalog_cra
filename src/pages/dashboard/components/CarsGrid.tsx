import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { useDashboardStore, useUIStore } from '../../../StoreProvider';
import CarCard from './CarCard';
import HeaderToggleOrSpan from './HeaderToggleOrSpan';
import GridPagination from './GridPagination';
import NoResults from '../../../components/common/NoResults';
import './CarsGrid.css';

const CarsGrid = observer(() => {
  const {
    vehiclesList,
    filters,
    sortOptions,
    setSortFilter,
  } = useDashboardStore();
  const { t } = useTranslation();

  const { carsGridSmallScreen } = useUIStore();
  const { paginatedVehicles, results } = vehiclesList;

  return (
    <div className="c-carsGrid-top-container">
      <header>
        <HeaderToggleOrSpan
          smallScreen={carsGridSmallScreen}
          resCount={results}
          activeFilters={2}
        />
        <div className="c-carsGrid-header-sort-filter">
          <label htmlFor="cars_grid_sort_filter">
            {`${t('carsGrid.sortFilter')}: `}
          </label>
          <select
            onChange={setSortFilter}
            value={filters.sortFilter}
            name="cars_grid_sort_filter"
          >
            {Object.keys(sortOptions).map((sortFilter) => (
              <option key={nanoid()} value={sortFilter}>
                {t(`sortParams.${sortFilter}`)}
              </option>
            ))}
          </select>
        </div>
      </header>
      {paginatedVehicles.length !== 0 ? (
        <div className="c-carsGrid-card-container">
          {paginatedVehicles.map((vehicle) => (
            <CarCard key={nanoid()} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <NoResults />
      )}
      <GridPagination />
    </div>
  );
});

export default CarsGrid;

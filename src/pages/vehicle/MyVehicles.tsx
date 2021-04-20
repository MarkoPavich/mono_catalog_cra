import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { useMyVehiclesStore } from '../../StoreProvider';
import VehicleCard from './components/VehicleCard';
import NoResults from '../../components/common/NoResults';
import OverlaySpinner from '../../components/common/OverlaySpinner';
import './MyVehicles.css';

const MyVehicles = observer(() => {
  const { carsData, isLoading } = useMyVehiclesStore();
  const { vehicles } = carsData;
  const { t } = useTranslation();

  return (
    <main className="p-myVehicles-top-container">
      {isLoading && <OverlaySpinner />}
      <div className="p-myVehicles-inner-container">
        <header>
          <span>{t('pageMyVehicles.pageHeader')}</span>
        </header>
        <section className="p-myvehicles-content-container">
          <header>
            <a href="/#">{t('pageMyVehicles.headerBackHref')}</a>
            <span>
              {t('pageMyVehicles.headerResCount')}: {vehicles.length}
            </span>
          </header>
          <div className="p-myVehicles-cards-container">
            {vehicles.length !== 0 ? (
              vehicles.map((vehicle) => (
                <VehicleCard key={nanoid()} vehicle={vehicle} />
              ))
            ) : (
              <NoResults />
            )}
          </div>
        </section>
      </div>
    </main>
  );
});

export default MyVehicles;

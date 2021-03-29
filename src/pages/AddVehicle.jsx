import React from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { withNamespaces } from 'react-i18next';
import './AddVehicle.css';
import AddVehicleForm from './addVehicle/AddVehicleForm';
import { useVehiclesStore } from '../StoreProvider';
import Spinner from '../components/common/Spinner';

const AddVehicle = observer(({ t }) => {
  const { search } = useLocation();
  const vehicleID = search.slice(4); // Vehicle ID from location param
  const { isLoading } = useVehiclesStore();

  return (
    <main className="f-addVehicle-top-container">
      <div className="f-addVehicle-inner-container">
        <header>
          <span>
            {vehicleID ? t('vehicleForm.editHeader') : t('vehicleForm.header')}
          </span>
        </header>
        <div className="f-addVehicle-form-container">
          {isLoading ? <Spinner /> : <AddVehicleForm vehicleID={vehicleID} />}
        </div>
      </div>
    </main>
  );
});

export default withNamespaces()(AddVehicle);

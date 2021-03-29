import React from 'react';
import { withNamespaces } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { useVehiclesStore } from '../../../StoreProvider';

const VehicleCard = observer(({ t, vehicle }) => {
  const { deleteVehicle } = useVehiclesStore();
  const { manufactureDate, make, model, variant, img, price, id } = vehicle;
  const header = `${manufactureDate.slice(0, 4)}. ${make.name} ${
    model.name
  } ${variant}`;

  return (
    <div className="p-myVehicles-carCard-unit">
      <div className="p-myVehicles-carCard-img-container">
        <img src={img} alt="vehicle.jpg" />
      </div>
      <div className="p-myVehicles-carCard-dataBox">
        <div className="p-myVehicles-carCard-header">
          <span>{header}</span>
        </div>
        <div className="p-myVehicles-carCard-price-id-container">
          <span>
            <strong>{t('pageMyVehicles.vehicleCardPrice')}: </strong>
            {price} €
          </span>
          <span>
            <strong>{t('pageMyVehicles.vehiceCardID')}: </strong>
            {id}
          </span>
        </div>
      </div>
      <div className="p-myVehicles-carCard-optionsBox">
        <button onClick={() => deleteVehicle(id)} type="submit">
          {t('pageMyVehicles.vehicleCardDelBtn')}
        </button>
      </div>
    </div>
  );
});

export default withNamespaces()(VehicleCard);

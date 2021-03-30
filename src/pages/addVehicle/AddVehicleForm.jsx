import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react-lite';
import { withNamespaces } from 'react-i18next';
import { useAddVehicleFormStore, useVehiclesStore } from '../../StoreProvider';

const AddVehicleForm = observer(({ t, vehicleID }) => {
  const {
    vehicleForm,
    setVehicleForm,
    clearVehicleForm,
    setEditMode,
    submitAddEditvehicle,
  } = useAddVehicleFormStore();
  const {
    make,
    model,
    variant,
    manufactureDate,
    mileage,
    bodyType,
    fuelType,
    img,
    description,
    price,
  } = vehicleForm;

  const { carsData, isLoading } = useVehiclesStore();
  const { carMakes, carBodies, fuelTypes } = carsData;

  async function handleSubmit(event) {
    event.preventDefault();
    const dataStored = await submitAddEditvehicle(vehicleID);
    if (dataStored) window.location.href = '#/';
  }

  useEffect(() => {
    if (vehicleID && !isLoading) setEditMode(vehicleID);
    else clearVehicleForm();
  }, []);

  return (
    <form className="f-addVehicle-form">
      <section>
        <header>
          <span>{t('vehicleForm.basicInfoHeader')}</span>
        </header>
        <div className="f-addVehicle-form-input-grid-container">
          <div
            data-tooltip={make.tooltip}
            className={`f-addVehicle-form-input-unit ${make.class}`}
          >
            <label htmlFor="make">{t('vehicleForm.make')}</label>
            <select onChange={setVehicleForm} value={make.value} name="make">
              <option value="">--</option>
              {Object.keys(carMakes)
                .slice()
                .sort((a, b) => (carMakes[a].name > carMakes[b].name ? 1 : -1))
                .map((key) => (
                  <option key={nanoid()} value={key}>
                    {carMakes[key].name}
                  </option>
                ))}
            </select>
          </div>
          <div
            data-tooltip={model.tooltip}
            className={`f-addVehicle-form-input-unit ${model.class}`}
          >
            <label htmlFor="model">{t('vehicleForm.model')}</label>
            <input
              onChange={setVehicleForm}
              value={model.value}
              placeholder={t('vehicleFormPlaceholders.model')}
              name="model"
              type="text"
            />
          </div>
          <div
            data-tooltip={variant.tooltip}
            className={`f-addVehicle-form-input-unit ${variant.class}`}
          >
            <label htmlFor="variant">{t('vehicleForm.variant')}</label>
            <input
              onChange={setVehicleForm}
              value={variant.value}
              placeholder={t('vehicleFormPlaceholders.variant')}
              name="variant"
              type="text"
            />
          </div>
          <div
            data-tooltip={manufactureDate.tooltip}
            className={`f-addVehicle-form-input-unit ${manufactureDate.class}`}
          >
            <label htmlFor="manufactureDate">
              {t('vehicleForm.manufactured')}
            </label>
            <input
              onChange={setVehicleForm}
              value={manufactureDate.value}
              name="manufactureDate"
              type="month"
            />
          </div>
          <div
            data-tooltip={mileage.tooltip}
            className={`f-addVehicle-form-input-unit ${mileage.class}`}
          >
            <label htmlFor="mileage">{t('vehicleForm.mileage')}</label>
            <input
              onChange={setVehicleForm}
              value={mileage.value}
              placeholder={t('vehicleFormPlaceholders.mileage')}
              name="mileage"
              type="number"
            />
          </div>
        </div>
      </section>
      <section>
        <header>
          <span>{t('vehicleForm.extraInfoSubheader')}</span>
        </header>
        <div className="f-addVehicle-form-input-grid-container">
          <div
            data-tooltip={bodyType.tooltip}
            className={`f-addVehicle-form-input-unit ${bodyType.class}`}
          >
            <label htmlFor="bodyType">{t('vehicleForm.bodyType')}</label>
            <select
              onChange={setVehicleForm}
              value={bodyType.value}
              name="bodyType"
            >
              <option value="">--</option>
              {Object.keys(carBodies).map((key) => (
                <option key={nanoid()} value={carBodies[key].id}>
                  {t(`vehicleParams.${carBodies[key].name}`)}
                </option>
              ))}
            </select>
          </div>
          <div
            data-tooltip={fuelType.tooltip}
            className={`f-addVehicle-form-input-unit ${fuelType.class}`}
          >
            <label htmlFor="fuelType">{t('vehicleForm.fuelType')}</label>
            <select
              onChange={setVehicleForm}
              value={fuelType.value}
              name="fuelType"
            >
              <option value="">--</option>
              {Object.keys(fuelTypes).map((key) => (
                <option key={nanoid()} value={fuelTypes[key].id}>
                  {t(`vehicleParams.${fuelTypes[key].name}`)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="f-addVehicle-form-longInput-container">
          <div
            data-tooltip={img.tooltip}
            className={`f-addVehicle-form-longInput-unit ${img.class}`}
          >
            <label htmlFor="img">{t('vehicleForm.img')}</label>
            <input
              onChange={setVehicleForm}
              value={img.value}
              name="img"
              placeholder="http://www..."
              type="text"
            />
          </div>
          <div
            data-tooltip={description.tooltip}
            className={`f-addVehicle-form-longInput-textarea-unit ${description.class}`}
          >
            <label htmlFor="description">{t('vehicleForm.description')}</label>
            <textarea
              onChange={setVehicleForm}
              value={description.value}
              name="description"
              id="vehicleDesc"
              cols="30"
              rows="10"
            />
          </div>
        </div>
        <div className="f-addVehicle-form-input-grid-container">
          <div
            data-tooltip={price.tooltip}
            className={`f-addVehicle-form-input-unit ${price.class}`}
          >
            <label htmlFor="price">
              <strong>{t('vehicleForm.price')}:</strong>
            </label>
            <input
              onChange={setVehicleForm}
              value={price.value}
              name="price"
              type="number"
            />
          </div>
          <div className="f-addVehicle-spacer" />
          <div className="f-addVehicle-form-actions-container">
            <a href="/">{t('vehicleForm.backLink')}</a>
            <button onClick={handleSubmit} type="submit">
              {vehicleID ? t('vehicleForm.edit') : t('vehicleForm.submit')}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
});

export default withNamespaces()(AddVehicleForm);

import { carBodies, fuelTypes } from '../mockup/carsData';
import sortOptions from '../mockup/sortOptions';

export default function filtersForms() {
  // Filtering params
  const bodyParams = {};
  const fuelParams = {};
  const makeParam = '';
  // Default sort option
  const sortFilter = sortOptions.modelNameAsc;

  // Parse available data to programmaticly create boolean filter forms
  // default to filter off
  Object.keys(carBodies).forEach((key) => {
    bodyParams[carBodies[key]] = false;
  });

  Object.keys(fuelTypes).forEach((key) => {
    fuelParams[fuelTypes[key]] = false;
  });

  return { bodyParams, fuelParams, makeParam, sortFilter };
}

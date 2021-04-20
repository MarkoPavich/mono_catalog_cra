import { carBodies, fuelTypes } from '../mockup/carsData';
import sortOptions from '../mockup/sortOptions';

type ParamFilters = {
  [param: string]: boolean;
};

export default function filtersForms() {
  // Filtering params
  const bodyParams: ParamFilters = {};
  const fuelParams: ParamFilters = {};
  const makeParam = '';
  // Default sort option
  const sortFilter = sortOptions.modelNameAsc;

  // Parse available data to programmaticly create boolean filter forms
  // default to filter off
  Object.keys(carBodies).forEach((key) => {
    bodyParams[carBodies[key].name] = false;
  });

  Object.keys(fuelTypes).forEach((key) => {
    fuelParams[fuelTypes[key].name] = false;
  });

  return { bodyParams, fuelParams, makeParam, sortFilter };
}

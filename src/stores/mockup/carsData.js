// This is a temporary dataset used to complete the project with an emphasis on JavaScript
// Future versions will have this imported from backend as JSON

export const carMakes = {
  opel: {
    id: 0,
    name: 'Opel',
  },
  bmw: {
    id: 1,
    name: 'BMW',
  },
  lada: {
    id: 2,
    name: 'Lada',
  },
  vw: {
    id: 3,
    name: 'VW',
  },
  peugeot: {
    id: 4,
    name: 'Peugeot',
  },
  renault: {
    id: 5,
    name: 'Renault',
  },
  hyundai: {
    id: 6,
    name: 'Hyundai',
  },
  kia: {
    id: 7,
    name: 'KIA',
  },
  mazda: {
    id: 8,
    name: 'Mazda',
  },
  audi: {
    id: 9,
    name: 'Audi',
  },
  seat: {
    id: 10,
    name: 'Seat',
  },
  toyota: {
    id: 11,
    name: 'Toyota',
  },
  astonMartin: {
    id: 12,
    name: 'Aston Martin',
  },
};

// First key is carMake ID, second model ID
export const carModels = {
  9: { 0: { name: 'A4' } },
  6: { 0: { name: 'Elantra' } },
  12: { 0: { name: 'DB5' } },
};

export const carBodies = {
  compact: 'compact',
  coupe: 'coupe',
  sedan: 'sedan',
  stationWagon: 'stationWagon',
  suv: 'suv',
};

export const fuelTypes = {
  petrol: 'petrol',
  diesel: 'diesel',
  LPG: 'LPG',
  BEV: 'BEV',
  hybrid: 'hybrid',
};

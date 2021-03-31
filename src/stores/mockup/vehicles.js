import { carMakes, carModels, carBodies, fuelTypes } from './carsData';

const { audi, astonMartin, hyundai } = carMakes;
const { sedan, compact, stationWagon, coupe, suv } = carBodies;
const { petrol, diesel, LPG, hybrid, BEV } = fuelTypes;

const vehicles = [
  {
    id: 'Lqg0afLZgwg4_1wjadeJ0',
    make: audi,
    model: carModels[audi.id][0],
    variant: '2.0d',
    bodyType: sedan,
    fuelType: diesel,
    manufactureDate: '2014-06',
    img:
      'https://images.dealer.com/ddc/vehicles/2020/Audi/A4/Sedan/perspective/front-left/2020_24.png',
    mileage: 260000,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium ducimus blanditiis et iusto',
    price: 6000,
  },
  {
    id: '03W1lE-ao4vB5JS1tX7nd',
    make: astonMartin,
    model: carModels[astonMartin.id][0],
    bodyType: compact,
    fuelType: petrol,
    variant: 'James Bond Edition',
    manufactureDate: '1963-03',
    img:
      'https://static.wikia.nocookie.net/forzamotorsport/images/1/12/HOR_XB1_JBE_AM_DB5.png',
    mileage: 30000,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium',
    price: 50000,
  },
  {
    id: 'TfoVoQEhtHj-lSn5lQ0TG',
    make: hyundai,
    model: carModels[hyundai.id][0],
    fuelType: LPG,
    bodyType: stationWagon,
    variant: '1.6l',
    manufactureDate: '2011-05',
    img:
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/2011_Hyundai_Elantra_GLS_--_06-02-2011_1.jpg',
    mileage: '12000',
    description: 'At vero eos.',
    price: 9000,
  },
  {
    id: '5GKiOfisd3-y-DQ3VLoIE',
    make: audi,
    model: carModels[audi.id][0],
    bodyType: coupe,
    variant: '2.0d',
    fuelType: hybrid,
    manufactureDate: '2014-06',
    img:
      'https://images.dealer.com/ddc/vehicles/2020/Audi/A4/Sedan/perspective/front-left/2020_24.png',
    mileage: 328000,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium ducimus blanditiis et iusto',
    price: 12000,
  },
  {
    id: 'qbqB05FQsuwZJYQ_fq09h',
    make: astonMartin,
    model: carModels[astonMartin.id][0],
    fuelType: BEV,
    bodyType: suv,
    variant: 'James Bond Edition',
    manufactureDate: '1963-03',
    img:
      'https://static.wikia.nocookie.net/forzamotorsport/images/1/12/HOR_XB1_JBE_AM_DB5.png',
    mileage: 80000,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium',
    price: 89000,
  },
  {
    id: '6Vd4scTVfYDBBOAC3_i5p',
    make: hyundai,
    model: carModels[hyundai.id][0],
    fuelType: petrol,
    bodyType: stationWagon,
    variant: '1.6l',
    manufactureDate: '2011-05',
    img:
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/2011_Hyundai_Elantra_GLS_--_06-02-2011_1.jpg',
    mileage: 12323,
    description: 'At vero eos.',
    price: 7450,
  },
  {
    id: 'Lqg0afsigpwg4_1wjadeJ0',
    make: astonMartin,
    model: carModels[astonMartin.id][0],
    bodyType: compact,
    fuelType: petrol,
    variant: 'James Bond Edition',
    manufactureDate: '1963-03',
    img:
      'https://static.wikia.nocookie.net/forzamotorsport/images/1/12/HOR_XB1_JBE_AM_DB5.png',
    mileage: 30000,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium',
    price: 50000,
  },
  {
    id: '03W1lE-sr78ibnsprt',
    make: hyundai,
    model: carModels[hyundai.id][0],
    fuelType: LPG,
    bodyType: sedan,
    variant: '1.6l',
    manufactureDate: '2011-05',
    img:
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/2011_Hyundai_Elantra_GLS_--_06-02-2011_1.jpg',
    mileage: '12000',
    description: 'At vero eos.',
    price: 9000,
  },
  {
    id: 'TfoVoQEhtHj-su4i_srl88',
    make: audi,
    model: carModels[audi.id][0],
    bodyType: coupe,
    variant: '2.0d',
    fuelType: hybrid,
    manufactureDate: '2014-06',
    img:
      'https://images.dealer.com/ddc/vehicles/2020/Audi/A4/Sedan/perspective/front-left/2020_24.png',
    mileage: 328000,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium ducimus blanditiis et iusto',
    price: 12000,
  },
  {
    id: '5GKiOfisd3-y-D99mmkpLoIE',
    make: astonMartin,
    model: carModels[astonMartin.id][0],
    fuelType: BEV,
    bodyType: suv,
    variant: 'James Bond Edition',
    manufactureDate: '1963-03',
    img:
      'https://static.wikia.nocookie.net/forzamotorsport/images/1/12/HOR_XB1_JBE_AM_DB5.png',
    mileage: 80000,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium',
    price: 89000,
  },
  {
    id: 'qbqBuxpQsuwZJYQ_fb09h',
    make: hyundai,
    model: carModels[hyundai.id][0],
    fuelType: petrol,
    bodyType: compact,
    variant: '1.6l',
    manufactureDate: '2011-05',
    img:
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/2011_Hyundai_Elantra_GLS_--_06-02-2011_1.jpg',
    mileage: 12323,
    description: 'At vero eos.',
    price: 7450,
  },
];

export default vehicles;

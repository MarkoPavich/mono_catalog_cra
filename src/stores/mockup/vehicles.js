import { nanoid } from 'nanoid';
import { carMakes, carModels, carBodies, fuelTypes } from './carsData';

const { audi, astonMartin, hyundai } = carMakes;
const { sedan, compact, convertible, coupe, pickup } = carBodies;
const { petrol, diesel, LPG, hybrid, BEV } = fuelTypes;

const vehicles = [
  {
    id: nanoid(),
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
    id: nanoid(),
    make: astonMartin,
    model: carModels[astonMartin.id][0],
    bodyType: compact,
    fuelType: petrol,
    variant: 'James Bond Edition',
    manufactureDate: '1963-03',
    img:
      'https://static.wikia.nocookie.net/forzamotorsport/images/1/12/HOR_XB1_JBE_AM_DB5.png/revision/latest?cb=20191125215511',
    mileage: 30000,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium',
    price: 50000,
  },
  {
    id: nanoid(),
    make: hyundai,
    model: carModels[hyundai.id][0],
    fuelType: LPG,
    bodyType: convertible,
    variant: '1.6l',
    manufactureDate: '2011-05',
    img:
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/2011_Hyundai_Elantra_GLS_--_06-02-2011_1.jpg',
    mileage: '12000',
    description: 'At vero eos.',
    price: 9000,
  },
  {
    id: nanoid(),
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
    id: nanoid(),
    make: astonMartin,
    model: carModels[astonMartin.id][0],
    fuelType: BEV,
    bodyType: convertible,
    variant: 'James Bond Edition',
    manufactureDate: '1963-03',
    img:
      'https://static.wikia.nocookie.net/forzamotorsport/images/1/12/HOR_XB1_JBE_AM_DB5.png/revision/latest?cb=20191125215511',
    mileage: 80000,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium',
    price: 89000,
  },
  {
    id: nanoid(),
    make: hyundai,
    model: carModels[hyundai.id][0],
    fuelType: petrol,
    bodyType: pickup,
    variant: '1.6l',
    manufactureDate: '2011-05',
    img:
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/2011_Hyundai_Elantra_GLS_--_06-02-2011_1.jpg',
    mileage: 12323,
    description: 'At vero eos.',
    price: 7450,
  },
  {
    id: nanoid(),
    make: astonMartin,
    model: carModels[astonMartin.id][0],
    bodyType: compact,
    fuelType: petrol,
    variant: 'James Bond Edition',
    manufactureDate: '1963-03',
    img:
      'https://static.wikia.nocookie.net/forzamotorsport/images/1/12/HOR_XB1_JBE_AM_DB5.png/revision/latest?cb=20191125215511',
    mileage: 30000,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium',
    price: 50000,
  },
  {
    id: nanoid(),
    make: hyundai,
    model: carModels[hyundai.id][0],
    fuelType: LPG,
    bodyType: convertible,
    variant: '1.6l',
    manufactureDate: '2011-05',
    img:
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/2011_Hyundai_Elantra_GLS_--_06-02-2011_1.jpg',
    mileage: '12000',
    description: 'At vero eos.',
    price: 9000,
  },
  {
    id: nanoid(),
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
    id: nanoid(),
    make: astonMartin,
    model: carModels[astonMartin.id][0],
    fuelType: BEV,
    bodyType: convertible,
    variant: 'James Bond Edition',
    manufactureDate: '1963-03',
    img:
      'https://static.wikia.nocookie.net/forzamotorsport/images/1/12/HOR_XB1_JBE_AM_DB5.png/revision/latest?cb=20191125215511',
    mileage: 80000,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium',
    price: 89000,
  },
  {
    id: nanoid(),
    make: hyundai,
    model: carModels[hyundai.id][0],
    fuelType: petrol,
    bodyType: pickup,
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

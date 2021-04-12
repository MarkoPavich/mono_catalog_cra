/* Generic and common function Types */
// Generic key-value pairs
export type Dict = {
  [key: string]: string;
};

// Used to override types 
export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

/* Vehicles-data related types */
// car prop data fields
export type PropData = {
  id: string;
  name: string;
  abrv?: string;
};

// Prop data mapped to props
export type CarProp = {
  [prop: string]: PropData
}

// Base carModel object
export type BaseModel = {
  name: string
};

// CarModels mapped to carMakes
export type CarModel = {
  [makeID: string]: {[modelID: string]: BaseModel};
};

// Vehicle object 
export type Vehicle = {
  id: string;
  make: PropData;
  model: BaseModel;
  fuelType: PropData;
  bodyType: PropData;
  variant: string;
  manufactureDate: string;
  img: string;
  mileage: string;
  description: string;
  price: string;
}

// temp vehicle object in processing
export type PreVehicle = Override<Vehicle, {
  model: string;
  id?: string
}>

export type ValidatedVehicleData = Override<PreVehicle, {
  bodyType: string;
  fuelType: string;
  make: string;
}>

// Vehicles data store obj
export type CarsData = {
  vehicles: Vehicle[];
  carModels: CarModel;
  carMakes: CarProp;
  carBodies: CarProp;
  fuelTypes: CarProp;
}

/* Auth Data Models */

export type User = {
  id: string | number;
  username: string;
  email: string;
}

export type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean | null;
  token: string | null;
  user: User | null;
}
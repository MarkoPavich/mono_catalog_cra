/* Form templates with defalted values */

// CSS classNames for input containers

export type Form = {
  [field: string]: FormField;
};

type FormField = {
  value: string;
  class: string;
  tooltip: string;
};

export type InputStatus = typeof inputStatus;
export const inputStatus = {
  normal: '',
  error: 'input-error',
};

export const vehicleForm: Form = {
  make: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  model: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  variant: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  manufactureDate: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  mileage: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  bodyType: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  fuelType: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  img: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  description: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  price: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
};

export const loginForm = {
  username: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  password: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
};

export const registerForm = {
  username: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  email: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  password: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  password2: {
    value: '',
    class: inputStatus.normal,
    tooltip: '',
  },
  touCheck: {
    value: 'false',
    class: inputStatus.normal,
    tooltip: '',
  },
};

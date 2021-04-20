/* eslint-disable no-param-reassign */
import i18n from '../../i18n'; // Translations library
import { inputStatus } from '../templates/forms';
import { Form } from '../templates/forms';
import { Dict } from '../../types';

type Tooltip = {
  [field: string]: string;
};

export function validateAuthForm(data: Dict) {
  let isValid = true;
  const tooltips: Tooltip = {};

  Object.keys(data).forEach((key) => {
    // Define tooltip field and default to falsy
    tooltips[key] = '';
    // Check empty field
    if (!data[key]) {
      isValid = false;
      tooltips[key] = i18n.t('formErrors.emptyField');
    }
    // Check terms of use agreed
    if (key === 'touCheck' && data[key] === 'false') {
      isValid = false;
      tooltips[key] = i18n.t('formErrors.termsOfUse');
    }
    // Check email
    if (
      key === 'email' &&
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data[key])
    ) {
      isValid = false;
      tooltips[key] = i18n.t('formErrors.invalidEmail');
    }
    // Check if passwords match
    if ((key === 'password' || key === 'password2') && 'password2' in data) {
      if (data.password !== data.password2) {
        isValid = false;
        tooltips[key] = i18n.t('formErrors.paswMismatch');
      }
    }
  });
  // Return if form valid and tooltips if any
  return {
    isValid,
    tooltips,
  };
}

export function validateVehicleForm(data: Dict) {
  let isValid = true;
  const tooltips: Tooltip = {};
  const requiredFields = [
    'make',
    'model',
    'manufactureDate',
    'mileage',
    'bodyType',
    'fuelType',
    'img',
    'price',
  ];

  Object.keys(data).forEach((key) => {
    tooltips[key] = '';

    // Check for empty field
    if (!data[key] && requiredFields.includes(key)) {
      isValid = false;
      tooltips[key] = i18n.t('formErrors.emptyField');
    }

    // Check for valid image URL (protocol not required)
    if (
      key === 'img' &&
      !/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
        data[key]
      )
    ) {
      isValid = false;
      tooltips[key] = i18n.t('formErrors.invalidURL');
    }
  });

  return {
    isValid,
    tooltips,
  };
}

// forms-handling stores helper function
export function markFields(form: Form, tooltips: Tooltip) {
  // Loop over every field in form
  Object.keys(tooltips).forEach((key) => {
    if (tooltips[key]) {
      // truthy tooltip means error
      form[key].class = inputStatus.error; // Apply error CSS classname to field and provide tooltip
      form[key].tooltip = tooltips[key];
    } else {
      // falsy tooltip - revert field classname and clear tooltip
      form[key].class = inputStatus.normal;
      form[key].tooltip = '';
    }
  });
}

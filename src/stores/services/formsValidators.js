import i18n from '../../i18n'; // Translations library

export function validateAuthForm(data) {
  let isValid = true;
  const tooltips = {};

  Object.keys(data).forEach((key) => {
    // Define tooltip field and default to null
    tooltips[key] = null;
    // Check empty field
    if (!data[key]) {
      isValid = false;
      tooltips[key] = i18n.t('formErrors.emptyField');
    }
    // Check terms of use agreed
    if (key === 'touCheck' && data[key] === false) {
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

export function validateVehicleForm(data) {
  let isValid = true;
  const tooltips = {};
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
    tooltips[key] = null;

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

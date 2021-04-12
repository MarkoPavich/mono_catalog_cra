import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useMessageStore } from '../../StoreProvider';
import { Dict } from '../../types';

const Alert = observer(() => {
  const { t } = useTranslation();
  const alert = useAlert(); // Alert library hook
  const { message, commonErrors, commonConfirmations } = useMessageStore();
  const oldMessage = useRef({}); // init useRef

  // Define common responses and prep with translations
  const commonErrorResponses: Dict = {
    userExists: t('commonErrors.userExists'),
    emailExists: t('commonErrors.emailExists'),
    invalidLogin: t('commonErrors.invalidLogin'),
    invalidVehicleForm: t('commonErrors.invalidVehicleForm'),
    noMatchingVehicleID: t('commonErrors.noMatchingVehicleID'),
  };

  const commonConfirmationResponses: Dict = {
    userRegistered: t('commonConfirmations.userRegistered'),
    userLogged: t('commonConfirmations.userLogged'),
    vehicleAdded: t('commonConfirmations.vehicleAdded'),
    vehicleEdited: t('commonConfirmations.vehicleEdited'),
  };

  useEffect(() => {
    // Check if message already fired
    if (oldMessage.current !== message) {
      // If not, check type for appropriate response and fire notification
      if (message.type in commonErrors) {
        alert.error(commonErrorResponses[message.type]);
      } else if (message.type in commonConfirmations) {
        alert.success(
          `${commonConfirmationResponses[message.type]} ${message.txt}`
        );
      } else if (message.type) {
        switch (message.type) {
          case 'success':
            alert.success(message.txt);
            break;
          case 'error':
            alert.error(message.txt);
            break;
          case 'info':
            alert.info(message.txt);
        }
      }

      // Avoid firing on rerenders by storing fired msg object for comparison
      oldMessage.current = message;
    }
  });

  return <></>;
});

export default Alert;

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Redirect } from 'react-router-dom';
import { useAuthStore } from '../../StoreProvider';
import Spinner from './Spinner';

const LoadUser = observer(() => {
  const { authState, getUser } = useAuthStore();
  const { token } = authState;

  useEffect(() => {
    if (token) getUser(); // If token in localStorage, try to authenticate
  }, []);

  // getUser function will remove token if invalid
  // Show spinner loading animation while awaiting server response
  return !token ? <Redirect to="/login" /> : <Spinner />;
});

export default LoadUser;

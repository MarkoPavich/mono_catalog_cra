import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Redirect } from 'react-router-dom';
import { useAuthStore } from '../../StoreProvider';
import Spinner from './spinner/Spinner';

const LoadUser = observer(() => {
  const { authState, getUser } = useAuthStore();
  const { token } = authState;

  useEffect(() => {
    if (token) getUser();
  }, []);

  return !token ? <Redirect to="/login" /> : <Spinner />;
});

export default LoadUser;

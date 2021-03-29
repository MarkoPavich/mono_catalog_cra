import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import { useAuthStore } from '../../StoreProvider';
import LoadUser from './LoadUser';

const PrivateRoute = observer(({ component: Component, ...rest }) => {
  const { authState, validateLogin } = useAuthStore();
  const { isAuthenticated } = authState;

  // Constantly verify auth token
  useEffect(() => {
    validateLogin();
  });

  // If user is authenticated, load privateRoute component
  // If not, try to authenticate via localStorage token
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component props={props} /> : <LoadUser />
      }
    />
  );
});

export default PrivateRoute;

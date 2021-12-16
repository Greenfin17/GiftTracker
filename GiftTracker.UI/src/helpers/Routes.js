import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (values) => (user
    ? (<Component {...values} user={user} />)
    : (<Navigate to={{ pathname: '/not-found', state: { from: values.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};

const Routes = ({
  user,
}) => (
    <Routes>
      <Route exact path='/' component={() => <Home user={user} />} />
    </Routes>
);

Routes.propTypes = {
  user: PropTypes.any,
};

export default Routes;

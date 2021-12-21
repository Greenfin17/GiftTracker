import React from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import Profile from '../views/Profile';
import People from '../views/People';
import Occasions from '../views/Occasions';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (values) => (user
    ? (<Component {...values} user={user} />)
    : (<Navigate to={{ pathname: '/not-found', state: { from: values.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any,
  setUser: PropTypes.func
};

const GTRoutes = ({
  user,
  setUser
}) => (
  <>
    <Routes>
      <Route path='/' element={<Home user={user} />} />
      <Route path='/profile' element={<Profile user={user}
        setUser={setUser} />} />
      <Route path='/people' element={<People user={user} />} />
      <Route path='/occasions' element={<Occasions user={user} />} />
    </Routes>
  </>
);

GTRoutes.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default GTRoutes;

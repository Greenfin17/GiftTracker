import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ user }) => (
  <>
  { user
    && <>
      <p>Hi {user.fullName}</p>
      <h1>Welcome to Sports Roster</h1>
    </>
  }
  { !user
    && <>
      <h1>Welcome to Gift Tracker</h1>
      <h5>Sign in to track gifts</h5>
    </>
  }
  </>
);

Home.propTypes = {
  user: PropTypes.any
};

export default Home;

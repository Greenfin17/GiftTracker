import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ user }) => (
  <div className='gt-home'>
  { user
    && <>
      <p>Hi {user.firstName} {user.lastName}</p>
      <h1>Welcome to Gift Tracker</h1>
    </>
  }
  { !user
    && <>
      <h1>Welcome to Gift Tracker</h1>
      <h5>Sign in to track gifts</h5>
    </>
  }
  </div>
);

Home.propTypes = {
  user: PropTypes.any
};

export default Home;

import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({
  user
}) => (
  <>
    {user &&
      <div className = 'gt-page'>
        Profile for {user.firstName} {user.LastName}
      </div>
    }
  </>
);

Profile.propTypes = {
  user: PropTypes.any
};

export default Profile;

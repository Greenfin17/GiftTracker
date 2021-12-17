import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signInUser } from '../../helpers/auth/auth';

const LoginButton = ({
  setUser
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    signInUser(setUser);
    navigate('/');
  };

  return (
    <div>
      <div name='google-auth' className='gt-login'
        onClick={handleClick}>Google Login
      </div>
    </div>
  );
};

LoginButton.propTypes = {
  setUser: PropTypes.func
};

export default LoginButton;

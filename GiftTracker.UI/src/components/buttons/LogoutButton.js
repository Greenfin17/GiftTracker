import React from 'react';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../../helpers/auth/auth';

const LogoutButton = ({
  setUser 
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    signOutUser().then(() => {
      setUser(false);
      navigate('/');
    });
  };

  return (
    <div>
    <button id="google-auth" className="btn btn-danger btn-sm"
      onClick={handleClick}>
      <i className="fas fa-sign-out-alt logout"
        onClick={handleClick}></i><br />Log Out</button>
    </div>
  );
};

LogoutButton.propTypes = {
  setUser: PropTypes.func
}

export default LogoutButton;

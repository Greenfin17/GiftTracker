import React from 'react';
import { useNavigate } from 'react-router-dom';
import signOut from '../../helpers/auth/signOut';

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    signOut().then(() => {
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

export default LogoutButton;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import signIn from '../../helpers/auth/signIn';

const LoginButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    signIn();
    navigate('/');
  };

  return (
    <div>
      <button name='google-auth' className='btn btn-danger'
        onClick={handleClick}>GOOGLE LOGIN
      </button>
    </div>
  );
};

export default LoginButton;

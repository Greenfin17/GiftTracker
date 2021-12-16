import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../helpers/auth/auth';

const LoginButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    signInUser();
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

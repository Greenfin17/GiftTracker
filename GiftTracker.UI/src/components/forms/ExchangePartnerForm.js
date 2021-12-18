import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { updateUser } from '../../helpers/data/userData';

const ExchangePartnerForm = ({
  user,
  setUser,
  closeModal
}) => {
  const [userProfile, setUserProfile] = useState({
    lastName: user.lastName || '',
    firstName: user.firstName || '',
    firebaseUID: user.firebaseUID || '',
    emailAddress: user.emailAddress || '',
    profilePicUrl: user.profilePicUrl || ''
  });

  const handleChange = (e) => {
    setUserProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : ''
    }));
  };

  const handleSubmit = () => {
    if (user) {
      updateUser(user.id, userProfile).then((result) => {
        console.warn(result);
        setUser(result);
        closeModal();
      });
    }
  }

  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Edit Profile
        <span className='x-out' onClick={closeModal}>x</span>
      </div>
      <label className='input-label' htmlFor='firstName'>First Name</label>
        <input className='form-input' type='text' name='firstName' value={userProfile.firstName}
              label='firstName' onChange={handleChange} />
      <label className='input-label' htmlFor='lastName'>Last Name</label>
        <input className='form-input' type='text' name='lastName' value={userProfile.lastName}
              label='lastName' onChange={handleChange} />
      <label className='input-label' htmlFor='emailAddress'>Email Address</label>
        <input className='form-input' type='text' name='emailAddress' value={userProfile.emailAddress}
              label='emailAddress' onChange={handleChange} />
      <label className='input-label' htmlFor='profilePicUrl'>Profile Image URL</label>
        <input className='form-input' type='text' name='profilePicUrl' value={userProfile.profilePicUrl}
              label='profilePicUrl' onChange={handleChange} />
      <div className='button-div'>
        <button className='close-button' onClick={closeModal}>Close</button>
        <button className='submit-button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
};

ExchangePartnerForm.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  closeModal: PropTypes.func
};

export default ExchangePartnerForm;

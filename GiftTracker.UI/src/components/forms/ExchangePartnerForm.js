import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getExchangePartners, addExchangePartner, updateExchangePartner } from '../../helpers/data/exchangePartnerData';
const ExchangePartnerForm = ({
  user,
  partner,
  setExchangePartners,
  closeModal
}) => {
  const [partnerProfile, setPartnerProfile] = useState({
    id: partner.id || '',
    createdById: partner.createdById || '',
    lastName: partner.lastName || '',
    firstName: partner.firstName || '',
    emailAddress: partner.emailAddress || '',
    imageURL: partner.imageURL || '',
    birthday: partner.birthday || '',
    colors: partner.colors || '',
    sizes: partner.sizes || ''
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setPartnerProfile({
        id: partner.id || '',
        createdById: partner.createdById || '',
        lastName: partner.lastName || '',
        firstName: partner.firstName || '',
        emailAddress: partner.emailAddress || '',
        imageURL : partner.imageURL || '',
        birthday: partner.birthday || '' ,
        colors: partner.colors || '',
        sizes: partner.sizes || '',
      });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [partner])

  const handleChange = (e) => {
    setPartnerProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : ''
    }));
  };

  const handleSubmit = () => {
    console.warn('submit');
    // if we are adding a new exchange partner
    debugger;
    if (!partner.id && user.id) {
      let newPartnerProfile = {
        createdById: user.id,
        lastName: partnerProfile.lastName || '',
        firstName: partnerProfile.firstName || '',
        emailAddress: partnerProfile.emailAddress || '',
        imageURL: partnerProfile.imageURL || '',
        birthday: partnerProfile.birthday || '' ,
        colors: partnerProfile.colors || '',
        sizes: partnerProfile.sizes || '',

      };
      
    addExchangePartner(newPartnerProfile).then(() => getExchangePartners().then((partnerList) =>
      setExchangePartners(partnerList)))
    }
    else {
      updateExchangePartner(partner.id, partnerProfile).then((wasUpdated) => {
        if (wasUpdated) {
          getExchangePartners().then((partnerList) => setExchangePartners(partnerList));
          }
        });
    }

    closeModal();
  };

  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Edit Exchange Partner Profile
        <span className='x-out' onClick={closeModal}>x</span>
      </div>
      <label className='input-label' htmlFor='firstName'>First Name</label>
        <input className='form-input' type='text' name='firstName' value={partnerProfile.firstName}
              label='firstName' onChange={handleChange} />
      <label className='input-label' htmlFor='lastName'>Last Name</label>
        <input className='form-input' type='text' name='lastName' value={partnerProfile.lastName}
              label='lastName' onChange={handleChange} />
      <label className='input-label' htmlFor='emailAddress'>Email Address</label>
        <input className='form-input' type='text' name='emailAddress' value={partnerProfile.emailAddress}
              label='emailAddress' onChange={handleChange} />
      <label className='input-label' htmlFor='imageURL'>Profile Image URL</label>
        <input className='form-input' type='text' name='imageURL' value={partnerProfile.imageURL}
              label='imageURL' onChange={handleChange} />
      <label className='input-label' htmlFor='birthday'>Birthday</label>
        <input className='form-input' type='date' name='birthday' value={partnerProfile.birthday.substring(0,10)}
              label='birthday' onChange={handleChange} />
      <label className='input-label' htmlFor='colors'>Favorite Colors</label>
        <input className='form-input' type='text' name='colors' value={partnerProfile.colors}
              label='colors' onChange={handleChange} />
      <label className='input-label' htmlFor='sizes'>Sizes</label>
        <input className='form-input' type='text' name='sizes' value={partnerProfile.sizes}
              label='sizes' onChange={handleChange} />
      <div className='button-div'>
        <button className='close-button' onClick={closeModal}>Close</button>
        <button className='submit-button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
};

ExchangePartnerForm.propTypes = {
  user: PropTypes.any,
  partner: PropTypes.object,
  setExchangePartners: PropTypes.func,
  closeModal: PropTypes.func
};

export default ExchangePartnerForm;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const PartnerInterestForm = ({
  interest,
  interestsList,
  setInterestsList,
  closeModal,
  }) => {
 const [interestProfile, setInterestProfile] = useState({
   id: interest.id || '',
   interestName: interest.interestName || '',
   description: interest.description || ''
 });

 useEffect(() => {
   let mounted = true;
   if (interest && mounted) {
    setInterestProfile({
      id: interest.id || '',
      interestName: interest.interestName || '',
      description: interest.description || ''
     })
   }
   return () => {
     mounted = false;
     return mounted;
   }
 }, [interest]);

  const handleChange = (e) => {
    setInterestProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : ''
    }));
  };

  const handleSubmit = () => {
    console.warn('handleSubmit');
    const tempList = interestsList;
    if (!interest.id) {
      tempList.push(interestProfile);
      setInterestsList(tempList);
    }
  };
  
  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Add / Edit Interest
        <span className='x-out' onClick={closeModal}>x</span>
      </div>
      <label className='input-label' htmlFor='interestName'>Interest / Note Title</label>
        <input className='form-input' type='text' name='interestName' value={interestProfile.interestName}
              label='firstName' onChange={handleChange} />
      <label className='input-label' htmlFor='interestDescription'>Interest Description</label>
        <input className='form-input' type='text' name='description' value={interestProfile.Description}
              label='firstName' onChange={handleChange} />
      <div className='button-div'>
        <button className='close-button' onClick={closeModal}>Close</button>
        <button className='submit-button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

PartnerInterestForm.propTypes = {
  interest: PropTypes.object,
  interestsList: PropTypes.array,
  setInterestsList: PropTypes.func,
  closeModal: PropTypes.func
};

export default PartnerInterestForm;

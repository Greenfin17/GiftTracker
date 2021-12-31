import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const PartnerInterestForm = ({
  interest,
  index,
  interestsList,
  setInterestsList,
  closeModal,
  }) => {
 const [interestProfile, setInterestProfile] = useState({
   id: interest.id || '',
   edit: interest.edited || false,
   interestName: interest.interestName || '',
   description: interest.description || ''
 });

 useEffect(() => {
   let mounted = true;
   if (interest && mounted) {
    setInterestProfile({
      id: interest.id || '',
      edited: interest.edited || false,
      interestName: interest.interestName || '',
      description: interest.description || ''
     })
   }
   return () => {
     mounted = false;
     return mounted;
   }
 }, [interest, index]);

  const handleChange = (e) => {
    setInterestProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : ''
    }));
  };

  const handleSubmit = () => {
    const tempList = interestsList;
    // adding a new note / interest
    if (interest.newInterest) {
      const tempObj = {
        ...interestProfile,
        newInterest: true,
        edited: false,
      };
      tempList.push(tempObj);
      setInterestsList(tempList);
    } else {
      tempList[index] = {
        ...interestProfile,
        newInterest: false,
        edited: true,
      };
      setInterestsList(tempList);
    }
    closeModal();
  };
  
  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Add / Edit Interest
        <span className='x-out' onClick={closeModal}>x</span>
      </div>
      <label className='input-label' htmlFor='interestName'>Interest / Note Title</label>
        <input className='form-input' type='text' name='interestName' value={interestProfile.interestName}
              label='interestName' onChange={handleChange} />
      <label className='input-label' htmlFor='interestDescription'>Interest Description</label>
        <textarea className='form-textarea' type='textarea' name='description' value={interestProfile.description}
              label='interestDescription' onChange={handleChange} />
      <div className='button-div'>
        <button className='close-button' onClick={closeModal}>Close</button>
        <button className='submit-button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

PartnerInterestForm.propTypes = {
  interest: PropTypes.object,
  index: PropTypes.number,
  interestsList: PropTypes.array,
  setInterestsList: PropTypes.func,
  closeModal: PropTypes.func
};

export default PartnerInterestForm;

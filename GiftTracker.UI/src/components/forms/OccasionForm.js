import React, { useState, useEffect }from 'react'
import PropTypes from 'prop-types';
import { addOccasion, updateOccasion, getOccasionsByUserId } from '../../helpers/data/occasionData';

const OccasionForm = ({
  user,
  occasion,
  setOccasionList,
  closeModal
}) => {

  const [occasionProfile, setOccasionProfile] = useState({
    occasionName: occasion.occasionName || '',
    occasionCreatorId: occasion.occasionCreatorId || '',
    occasionDate : occasion.occasionDate || '',
    occasionLocation : occasion.occasionLocation || '',
    occasionBudget : occasion.occasionBudget || '0.0'
  });
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (user && mounted) {
      setOccasionProfile({
        occasionName: occasion.occasionName || '',
        occasionCreatorId: occasion.occasionCreatorId || '',
        occasionDate : occasion.occasionDate || '',
        occasionLocation : occasion.occasionLocation || '',
        occasionBudget : occasion.occasionBudget || '0.0'
      });
    }
    return () => {
      mounted = false;
      return mounted;
    };
  }, [user, occasion])

  // disable the submit button if there is no valid occasion date
  // and no budget value > 0,  to avoid a sql error
  useEffect(() => {
    let mounted = true;
    let validDate = false;
    let validBudget = false;
    const dateStandard = new Date('1901-01-01');
    if (occasionProfile?.occasionDate.substring(0,10).length === 10) {
      if (Date.parse(occasionProfile.occasionDate) > dateStandard.getTime()) {
        validDate = true;
      }
    }
    if (parseInt(occasionProfile.occasionBudget) >= 0 ){
      validBudget = true;
    }
    if (mounted) {
      setDisableSubmit(!(validDate && validBudget));
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [occasionProfile.occasionDate, occasionProfile.occasionBudget])

  const handleChange = (e) => {
    setOccasionProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : ''
    }));
  };

  const handleSubmit = () => {
    // if we are adding a new occasion 
    if (!occasion.id && user.id) {
      let newOccasionProfile = {
        occasionCreatorId: user.id,
        occasionName: occasionProfile.occasionName || '',
        occasionDate: occasionProfile.occasionDate || '',
        occasionLocation: occasionProfile.occasionLocation || '',
        occasionBudget: occasionProfile.occasionBudget || '',
      };
      addOccasion(newOccasionProfile).then(() => getOccasionsByUserId(user.id).then((occasionList) => {
        setOccasionList(occasionList);
        }));
      }
    else {
      updateOccasion(occasion.id, occasionProfile).then((wasUpdated) => {
        if (wasUpdated) {
          getOccasionsByUserId(user.id).then((occasionList) => setOccasionList(occasionList));
          }
        });
    }
    closeModal();
    };

  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Edit Occasion 
        <span className='x-out' onClick={closeModal}>x</span>
      </div>
      <div className='form-group'>
        <label className='input-label' htmlFor='name'>Occasion Name</label>
          <input className='form-input' type='text' name='occasionName' value={occasionProfile.occasionName}
                label='name' onChange={handleChange} />
        <label className='input-label' htmlFor='date'>Occasion Date</label>
          <input className='form-input' type='date' name='occasionDate' value={occasionProfile.occasionDate.substring(0,10)}
                label='date' onChange={handleChange} />
        <label className='input-label' htmlFor='location'>Occasion Location (if applicable)</label>
            <input className='form-input' type='text' name='occasionLocation' value={occasionProfile.occasionLocation}
                  label='location' onChange={handleChange} />
        <label className='input-label' htmlFor='budget'>Occasion Budget</label>
            <input className='form-input' type='number' step='.01' name='occasionBudget' value={occasionProfile.occasionBudget}
                  label='budget' onChange={handleChange} />
      </div>
      <div className='button-div'>
        <button className='close-button'  onClick={closeModal}>Close</button>
        <button className='submit-button' onClick={handleSubmit}
                disabled={disableSubmit}>Submit</button>
      </div>
    </div>
  );
};

OccasionForm.propTypes = {
  user: PropTypes.any,
  occasion: PropTypes.object,
  setOccasionList: PropTypes.func,
  closeModal: PropTypes.func
};

export default OccasionForm;

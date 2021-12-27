import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getExchangePartnersByUserId, addExchangePartner, updateExchangePartner } from '../../helpers/data/exchangePartnerData';
import getExchangePartnerInterests from '../../helpers/data/interestData'
import PartnerInterestForm from './PartnerInterestForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  SecondaryGTModal,
  GTModalContent
} from '../ModalElements';
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
    birthday: partner.birthday || '1901-01-01',
    colors: partner.colors || '',
    sizes: partner.sizes || ''
  });
  const [interestsList, setInterestsList] = useState([]);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [activeObject, setActiveObject] = useState({
    exchangePartnerId: '',
    interestName: '',
    description: ''
  });

  const closeInterestModal = () => {
    setShowInterestModal(!showInterestModal);
  };

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
        birthday: partner.birthday || '1901-01-01',
        colors: partner.colors || '',
        sizes: partner.sizes || '',
      });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [partner])

  // setup list of exchange partner interests
  useEffect(() => {
    let mounted = true;
    if (partner.id && mounted){
      getExchangePartnerInterests(partner.id).then((responseArr) =>{
        if (responseArr.length > 0 && mounted) {
          setInterestsList(responseArr);
        } else setInterestsList([]);
      })
      .catch(() => {
        if (mounted) setInterestsList([]);
      });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [partner.id])

  const handleChange = (e) => {
    setPartnerProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : ''
    }));
  };

  const handleEditClick = (interest) => {
    setActiveObject(interest);
    console.warn('edit');
  };

  const handleDeleteClick = () => {
    console.warn('delete');
  };

  const handleAddInterestClick = () => {
    console.warn('add interest');
    setShowInterestModal(true);
  };

  const handleSubmit = () => {
    console.warn('submit');
    // if we are adding a new exchange partner
    if (!partner.id && user.id) {
      let newPartnerProfile = {
        createdById: user.id,
        lastName: partnerProfile.lastName || '',
        firstName: partnerProfile.firstName || '',
        emailAddress: partnerProfile.emailAddress || '',
        imageURL: partnerProfile.imageURL || '',
        birthday: partnerProfile.birthday || '1901-01-01',
        colors: partnerProfile.colors || '',
        sizes: partnerProfile.sizes || '',
      };
      
    addExchangePartner(newPartnerProfile).then(() => getExchangePartnersByUserId(user.id).then((partnerList) =>
      setExchangePartners(partnerList)))
    }
    else {
      updateExchangePartner(partner.id, partnerProfile).then((wasUpdated) => {
        if (wasUpdated) {
          getExchangePartnersByUserId(user.id).then((partnerList) => setExchangePartners(partnerList));
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
      <div className='form-group'>
        <label className='input-label' htmlFor='firstName'>First Name</label>
            <span className='partner-input-span'><input className='form-input' type='text' name='firstName' value={partnerProfile.firstName}
                  label='firstName' onChange={handleChange} /></span>
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
        <div className='partner-div'>
          <ul className='partner-list'>
        { interestsList.length ? interestsList?.map((interest) => <li key={interest.id}>
            {interest.interestName}
              <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                onClick={() => handleEditClick(interest)}/>
              <FontAwesomeIcon icon={faTrash} className='delete-icon'
                onClick={() => handleDeleteClick(interest)} /> </li>) : <div>No notes / interests</div> }
          </ul>
        </div>
      </div>
      <div className='button-div'>
        <button className='add-interest-btn' onClick = {handleAddInterestClick}>Add Interest/Note</button>
        <button className='close-button' onClick={closeModal}>Close</button>
        <button className='submit-button' onClick={handleSubmit}>Submit</button>
      </div>
      <SecondaryGTModal className='gt-modal' isOpen={showInterestModal}>
        <GTModalContent className='modal-content'>
          <PartnerInterestForm interest={activeObject} 
            interestsList={interestsList} setInterestsList={setInterestsList}
            closeModal={closeInterestModal}></PartnerInterestForm>
        </GTModalContent>
      </SecondaryGTModal>
    </div>
  );
};

ExchangePartnerForm.propTypes = {
  user: PropTypes.any,
  partner: PropTypes.object,
  setExchangePartners: PropTypes.func,
  closeModal: PropTypes.func
};

export default ExchangePartnerForm;

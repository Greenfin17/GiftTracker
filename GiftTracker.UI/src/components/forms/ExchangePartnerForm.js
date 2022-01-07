import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  addExchangePartner, 
  updateExchangePartner
} from '../../helpers/data/exchangePartnerData';
import { getPartnerInterests,
  addInterest,
  updateInterest,
  deleteInterest
} from '../../helpers/data/interestData'
import PartnerInterestForm from './PartnerInterestForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  SecondaryGTModal,
  GTModalContent
} from '../ModalElements';

const ExchangePartnerForm2 = ({
  user,
  partner,
  setExchangePartners,
  getPartnersMethod,
  getPartnersMethodArguments,
  showModal,
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
  const [interestsList, setInterestsList] = useState([]);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [activeObject, setActiveObject] = useState({
    newInterest: false,
    edited: false,
    deleted: false,
    exchangePartnerId: '',
    interestName: '',
    description: ''
  });
  const [interestIndex, setInterestIndex] = useState(-1);
  const dateStandard = new Date('1901-01-01');
  // const [disableSubmit, setDisableSubmit] = useState(true);
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
        birthday: partner.birthday || '',
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
    if (partner.id){
      getPartnerInterests(partner.id).then((responseArr) =>{
        if (responseArr.length > 0) {
          const tempList = [];
          responseArr.forEach((interest) => {
            const tempObj = {
              ...interest,
              // we have to distinguish new interests from existing
              newInterest: false,
              edited: false,
            }
            tempList.push(tempObj);
          });
          if (mounted) {
            setInterestsList(tempList);
          }
        } else if (mounted) setInterestsList([]);
      })
      .catch(() => {
        if (mounted) setInterestsList([]);
      });
    } else if (mounted) setInterestsList([]);
    return () => {
      mounted = false;
      return mounted;
    }
  }, [partner.id, showModal]);


  const handleChange = (e) => {
    setPartnerProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value : ''
    }));
  };

  const handleEditClick = (interest, index) => {
    setActiveObject(interest);
    setInterestIndex(index);
    setShowInterestModal(true);
  };

  const handleDeleteClick = (index) => {
    const tempList = [];
    // copying to new array so that React sees the change.
    for (let i = 0; i < interestsList.length; i += 1){
      if (i === index) {
        const tempObj = {
          ...interestsList[i],
          deleted: true
        }
        tempList.push(tempObj);
      } else {
        tempList.push(interestsList[i]);
      }
    }
    setInterestsList(tempList);
  };

  const handleAddInterestClick = () => {
    const newInterestObj = {
      newInterest: true,
      edited: false,
      deleted: false,
      exchangePartnerId: '',
      interestName: '',
      description: ''
    };

    setActiveObject(newInterestObj);
    setShowInterestModal(true);
  };

  const handleCloseForm = () => {
    closeModal();
  };

  const handleSubmit = () => {
    // if we are adding a new exchange partner
    if (!partner.id && user.id) {
      let newPartnerProfile = {
        createdById: user.id,
        lastName: partnerProfile.lastName || '',
        firstName: partnerProfile.firstName || '',
        emailAddress: partnerProfile.emailAddress || '',
        imageURL: partnerProfile.imageURL || '',
        birthday: partnerProfile.birthday || '',
        colors: partnerProfile.colors || '',
        sizes: partnerProfile.sizes || '',
      };
      
      addExchangePartner(newPartnerProfile).then((newId) => {
        interestsList.forEach((interest) => {
          const tempInterestObj = {
            exchangePartnerId: newId,
            interestName: interest.interestName,
            description: interest.description
          }
          addInterest(tempInterestObj);
        });
        getPartnersMethod(...getPartnersMethodArguments).then((partnerList) =>
          setExchangePartners(partnerList));
      });
    } else {
      // updating only
      updateExchangePartner(partner.id, partnerProfile).then((wasUpdated) => {
        if (wasUpdated) {
          interestsList.forEach((interest) => {
            if (interest.newInterest) {
              const tempObj = {
                exchangePartnerId: partner.id,
                interestName: interest.interestName,
                description: interest.description
              }
              addInterest(tempObj);
            } else if (interest.edited) {
              const tempObj = {
                id: interest.id,
                exchangePartnerId: partner.id,
                interestName: interest.interestName,
                description: interest.description
              }
              updateInterest(interest.id, tempObj);
            } else if (interest.deleted) {
              deleteInterest(interest.id);
            }
          });
          getPartnersMethod(getPartnersMethodArguments).then((partnerList) =>
            setExchangePartners(partnerList));
        }
      });
    }
    closeModal();
  };

  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Exchange Partner Profile
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
        <div className='interests-div'>
          <div className='interests-heading'>Interests / Notes</div>
          <ul className='interests-list'>
        { interestsList.length ? interestsList?.map((interest, index) =>  !interest.deleted && <li key={index}>
            <div className='interest-name'>
              {interest.interestName}
            </div>
              <div className='list-icon-div'>
              <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                onClick={() => handleEditClick(interest, index)}/>
              <FontAwesomeIcon icon={faTrash} className='delete-icon'
                onClick={() => handleDeleteClick(index)} /></div> </li>) : <div>No notes / interests</div> }
          </ul>
        </div>
      </div>
      <div className='button-div'>
        <button className='add-interest-btn' onClick = {handleAddInterestClick}>Add Interest/Note</button>
        <button className='close-button' onClick={handleCloseForm}>Close</button>
        <button className='submit-button' onClick={handleSubmit}
          disabled={!partnerProfile.firstName
             || !(Date.parse(partnerProfile.birthday) > dateStandard.getTime())
            }>Submit
        </button>
      </div>
      <SecondaryGTModal className='gt-modal' isOpen={showInterestModal}>
        <GTModalContent className='modal-content'>
          <PartnerInterestForm interest={activeObject} index={interestIndex}
            interestsList={interestsList} setInterestsList={setInterestsList}
            closeModal={closeInterestModal}></PartnerInterestForm>
        </GTModalContent>
      </SecondaryGTModal>
    </div>
  );
};

ExchangePartnerForm2.propTypes = {
  user: PropTypes.any,
  partner: PropTypes.object,
  setExchangePartners: PropTypes.func,
  getPartnersMethod: PropTypes.func,
  getPartnersMethodArguments: PropTypes.array,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func
};

export default ExchangePartnerForm2;

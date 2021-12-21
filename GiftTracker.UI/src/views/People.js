import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getExchangePartners, deleteExchangePartner } from '../helpers/data/exchangePartnerData';
import ExchangePartnerForm from '../components/forms/ExchangePartnerForm';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const People = ({
  user
}) => {
  const [exchangePartners, setExchangePartners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState({
    lastName: '',
    firstName: '',
    emailAddress: '',
    profilePicUrl: '',
    birthday: '',
    colors: '', 
    sizes: ''
  });

  useEffect(() => {
    let mounted = true;
    getExchangePartners().then((partnerList) => {
      if (mounted && partnerList?.length > 0) {
        setExchangePartners(partnerList);
      }
    })
    return () => {
      mounted = false;
      return mounted;
    };
  }, []);
            
  const handleEditClick = (partner) => { 
    setActiveObject(partner);
    setShowModal(true);
  };

  const handleDeleteClick = (partner) => {
    debugger;
    deleteExchangePartner(partner.id).then((wasDeleted) => {
      debugger;
      if (wasDeleted) {
        getExchangePartners().then((partnerList) => setExchangePartners(partnerList));
      }
    });
  }

  const handleAddPartnerClick = () => {
    setActiveObject({});
    setShowModal(true);
  }



  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='people-view'>
      <div className='page-title'>
        People
      </div>
    <div className='partner-div'>
      <ul className='partner-list'>
        { exchangePartners ? exchangePartners?.map((partner) => <li key={partner.id}
            className='partner-list-line' >
            <span><img src={partner.imageURL} alt='Gift Exchange Partner'
                      className='partner-icon-image'/></span>
            <span>{partner.firstName} {partner.lastName}</span>
              <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                onClick={() => handleEditClick(partner)}/>
              <FontAwesomeIcon icon={faTrash} className='delete-icon'
                onClick={() => handleDeleteClick(partner)}/> </li>) : <div>No exchange partners</div> }
      </ul>
      <div className='button-div'>
        <button className='add-partner-btn' onClick = {handleAddPartnerClick}>Add Exchange Partner</button>
      </div>
      <GTModal className='gt-modal' isOpen={showModal}>
        <GTModalContent className='modal-content'>
          <ExchangePartnerForm user={user} partner={activeObject} setExchangePartners={setExchangePartners}
            closeModal={closeModal}></ExchangePartnerForm>
        </GTModalContent>
      </GTModal>
    </div>
    </div>
  );
};

People.propTypes = {
  user: PropTypes.any
}

export default People;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getExchangePartnersByUserId, deleteExchangePartner } from '../helpers/data/exchangePartnerData';
import ExchangePartnerForm2 from '../components/forms/ExchangePartnerForm2';
import { deleteInterestsByPartnerId } from '../helpers/data/interestData';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../components/symbols/Avatar';

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
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (user) {
      getExchangePartnersByUserId(user.id).then((partnerList) => {
        if (mounted && partnerList?.length > 0) {
          setExchangePartners(partnerList);
        }
      });
    }
    return () => {
      mounted = false;
      return mounted;
    };
  }, [user]);

  const handlePartnerClick = (partner) => {
    if (partner.id !== void 0) {
      navigate(`/people/${partner.id}`);
    }
  }
            
  const handleEditClick = (partner) => { 
    setActiveObject(partner);
    setShowModal(true);
  };

  const handleDeleteClick = (partner) => {
    deleteInterestsByPartnerId(partner.id).then(() => {
      deleteExchangePartner(partner.id).then((wasDeleted) => {
        if (wasDeleted) {
          getExchangePartnersByUserId(user.id).then((partnerList) => setExchangePartners(partnerList));
        }
      });
    });
  };

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
      { user &&
        <div className='partner-div'>
          <ul className='partner-list'>
            { exchangePartners ? exchangePartners?.map((partner) => <li key={partner.id}
                className='partner-list-line' >
                <div className='partner-list-avatar' onClick={() => handlePartnerClick(partner)} >
                  <Avatar partner={partner} />
                </div>
                <div className='partner-list-name' onClick={() => handlePartnerClick(partner)}>{partner.firstName} {partner.lastName}</div>
                <div className='icon-div'>
                  <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                    onClick={() => handleEditClick(partner)}/>
                  <FontAwesomeIcon icon={faTrash} className='delete-icon'
                    onClick={() => handleDeleteClick(partner)}/></div></li>) : <div>No exchange partners</div> }
          </ul>
          <div className='button-div'>
            <button className='add-partner-btn' onClick = {handleAddPartnerClick}>Add Exchange Partner</button>
          </div>
          <GTModal className='gt-modal' isOpen={showModal}>
            <GTModalContent className='modal-content'>
              <ExchangePartnerForm2 user={user} partner={activeObject} setExchangePartners={setExchangePartners}
                getPartnersMethod={getExchangePartnersByUserId} getPartnersMethodArguments={[user.id]}
                showModal={showModal} closeModal={closeModal}></ExchangePartnerForm2>
            </GTModalContent>
          </GTModal>
        </div> }
    </div>
  );
};

People.propTypes = {
  user: PropTypes.any
}

export default People;

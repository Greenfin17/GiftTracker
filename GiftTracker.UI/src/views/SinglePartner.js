import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { getExchangePartnerByPartnerId } from '../helpers/data/exchangePartnerData';
import { getPartnerInterests } from '../helpers/data/interestData';
import Avatar from '../components/symbols/Avatar';
import ExchangePartnerForm2 from '../components/forms/ExchangePartnerForm2';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';

const SinglePartner = ({
  user
}) => {
  const { partnerId } = useParams();
  const [partner, setPartner] = useState();
  const [interests, setInterests] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (user && partnerId) {
      getExchangePartnerByPartnerId(partnerId).then((partnerObj) => {
        if (mounted) {
          setPartner(partnerObj);
        }
      });
      getPartnerInterests(partnerId).then((responseArr) =>{
        if (mounted) {
          setInterests(responseArr);
        }
      });
    }
    return () => {
      mounted = false;
    }
  }, [user, partnerId]);

  useEffect(() => {
    let mounted = true;
    if (user && partnerId) {
      getPartnerInterests(partnerId).then((responseArr) =>{
        if (mounted) {
          setInterests(responseArr);
        }
      });
    }
    return () => {
      mounted=true;
      return mounted;
    }
  }, [user, partnerId, partner])

  const handleEditClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='page-view single-partner-view'>
      { partner && <div className='page-title'>Gift Exchange Partner</div> }
      { user && partner && <div className='single-partner-outer-div'>
          <div className='single-partner-data-div'>
              <div className='single-partner-heading-div'>
                <div className='single-partner-name'><h2>{partner.firstName} {partner.lastName}</h2></div> 
                <div className='single-partner-image'><Avatar partner={partner}/></div> 
              </div>
              <div className='single-partner-data-group'>
                <div className='single-partner-label'>Email:</div> 
                <div className='single-partner-data'>{partner.emailAddress}</div> 
              </div>
              <div className='single-partner-data-group'>
                <div className='single-partner-label'>Birthday:</div> 
                <div className='single-partner-data'>{partner.birthday.split('T')[0]}</div> 
              </div>
              <div className='single-partner-data-group'>
                <div className='single-partner-label'>Image URL:</div> 
                <div className='single-partner-imageURL'>{partner.imageURL}</div> 
              </div>
              <div className='single-partner-data-group'>
                <div className='single-partner-label'>Favorite Colors:</div> 
                <div className='single-partner-data'>{partner.colors}</div> 
              </div>
              <div className='single-partner-data-group'>
                <div className='single-partner-label'>Sizes:</div> 
                <div className='single-partner-data'>{partner.sizes}</div> 
              </div>
              <div className='single-partner-interests-div'>
                <div className='single-partner-interests-heading'>Interests / notes</div>
                {interests.length > 0 ? interests.map((interest) => <div className='interest-item-div'
                  key={interest.id}>
                    <div className='interest-title'>{interest.interestName}:</div>
                    <div className='interest-description'>{interest.description}</div>
                  </div>) : <div className='interest-alternate'>No interests / notes</div>}
              </div>
          </div>
            <div className='icon-div'>
              <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                onClick={() => handleEditClick(partner)}/>
            </div>
          <GTModal className='gt-modal' isOpen={showModal}>
            <GTModalContent className='modal-content'>
              <ExchangePartnerForm2 user={user} partner={partner} setExchangePartners={setPartner}
                getPartnersMethod={getExchangePartnerByPartnerId} getPartnersMethodArguments={[partnerId]}
                showModal={showModal} closeModal={closeModal}></ExchangePartnerForm2>
            </GTModalContent>
          </GTModal>
        </div> }
    </div>
  );
};

SinglePartner.propTypes = {
  user: PropTypes.any
};

export default SinglePartner;

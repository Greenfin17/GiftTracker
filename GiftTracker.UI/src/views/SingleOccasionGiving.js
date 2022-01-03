import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
import GiveItemForm from '../components/forms/GiveItemForm';
import { getOccasionById } from '../helpers/data/occasionData';
import {
  getGiveItemsByOccasionAndRecipientId,
  deleteGiveItem
} from '../helpers/data/givingData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getExchangePartnerByPartnerId } from '../helpers/data/exchangePartnerData';


const SingleEventPartnerGiving = ({
  user
}) => {
  const { occasionId, partnerId } = useParams();
  const [occasion, setOccasion] = useState();
  const [partner, setPartner] = useState();
  const [givingList, setGivingList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState({
    id: '',
    occasionId: '',
    recipientId: '',
    wishListItemId: '',
    itemName: '',
    itemDescription: '',
    merchantItemURL: '',
    price: 0,
    purchased: false,
    wrapped: false,
    shipped: false,
    reaction: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (occasionId) {
      getOccasionById(occasionId).then((resultObj) => {
        if (mounted) {
          setOccasion(resultObj);
        }
      });
    };
    return () => {
      mounted = false;
    }
  }, [occasionId]);

  useEffect(() => {
    let mounted = true;
    if ( user && occasionId && partnerId) {
      getGiveItemsByOccasionAndRecipientId(occasionId, partnerId) 
        .then((resultList) => {
          if (mounted) {
            setGivingList(resultList);
          }
        });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [user, occasionId, partnerId]);

  useEffect(() => {
    let mounted = true;
    if (user && partnerId ) {
      getExchangePartnerByPartnerId(partnerId).then((result) => {
        if (mounted) {
          setPartner(result);
        }
      });
    }
    return () => {
      mounted = false;
    }
  }, [user, partnerId]);

  const handleAddGiftClick = () => {
    setActiveObject({
      occasionId: occasionId,
      recipientId: partnerId,
      recipientFirstName: partner.firstName,
      recipientLastName: partner.lastName,
      wishListItemId: '',
      itemName: '',
      itemDescription: '',
      merchantItemURL: '',
      price: 0,
      purchased: false,
      wrapped: false,
      shipped: false,
      reaction: ''
    });
    setShowModal(true);
  };

  const handleGiftClick = (item) => {
    if (item !== void 0) {
      navigate(`/giving/sendGift/${item.id}`);
    }
  };

  const handlePartnerClick = (item) => {
    if (item !== void 0) {
      navigate(`/people/${item.recipientId}`);
    }
  };

  const handleEditClick = (item) => {
    setActiveObject(item);
    setShowModal(true);
  };
  
  const handleDeleteClick = (item) => {
    deleteGiveItem(item.id).then((wasDeleted) => {
      if (wasDeleted) {
        getGiveItemsByOccasionAndRecipientId(occasionId, partnerId).then((givingArr) => setGivingList(givingArr));
        }
    });
  };
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='giving-view'>
      <div className='page-title'>
         Giving
      </div>
      { user && occasion && <div className='giving-div'>
        <div className='giving-list-outer-div'>
          <div className='giving-title'>{occasion?.occasionName} {occasion?.occasionDate.split('T')[0]} </div> 
          { givingList && givingList.length > 0 ? <>
          <table className='giving-list'>
            <thead>
            <tr className='table-header'>
              <th className='giving-list-gift-header'>Gift</th>
              <th className='giving-list-recipient-header'>Recipient</th>
            </tr>
            </thead>
            <tbody>
            { givingList.map((item) => <tr key={item.id}>
              <td className='giving-list-title'onClick={() => handleGiftClick(item)}>{item.itemName} </td>
              <td className='giving-list-recipient' onClick={() => handlePartnerClick(item)}>
                {item.recipientFirstName} {item.recipientLastName}</td>
                <td>
                <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                  onClick={() => handleEditClick(item)}/>
                <FontAwesomeIcon icon={faTrash} className='delete-icon'
                  onClick={() => handleDeleteClick(item)}/> 
                </td>
            </tr>)}
            </tbody>
          </table> </> :  <> { givingList && <div className='giving-empty-message'>No Gifts!</div> } </> }
          { occasionId && 
          <div className='button-div'>
            <button className='add-give-item-btn' onClick ={handleAddGiftClick}>Add Gift</button>
          </div> }
          <GTModal className='gt-modal' isOpen={showModal}>
            <GTModalContent className='modal-content'>
              <GiveItemForm user={user} item={activeObject} occasionId={occasionId}
                partnerId={partnerId} showModal={showModal}
                setGivingList={setGivingList} getGiftsMethod={getGiveItemsByOccasionAndRecipientId}
                getGiftsMethodArguments={[occasionId, partnerId]} closeModal={closeModal} />
            </GTModalContent>
          </GTModal>
        </div>
      </div> }
    </div>
  );
};

SingleEventPartnerGiving.propTypes = {
  user: PropTypes.any
};

export default SingleEventPartnerGiving; 

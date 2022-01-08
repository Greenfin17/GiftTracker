import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
import { getOccasionById } from '../helpers/data/occasionData';
import ReceiveItemForm from '../components/forms/ReceiveItemForm';
import { getReceiveItemsByOccasionIdAndGiverId, deleteReceiveItem } from '../helpers/data/receivingData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getExchangePartnerByPartnerId } from '../helpers/data/exchangePartnerData';

const SingleOccasionReceiving = ({
  user
}) => {
  const { occasionId, partnerId } = useParams();
  const [occasion, setOccasion] = useState();
  const [partner, setPartner] = useState();
  const [receivingList, setReceivingList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState({
    id: '',
    occasionId: '',
    giverId: '',
    giverFirstName: '',
    giverLastName: '',
    itemName: '',
    itemDescription: '',
    itemURL: '',
    remarks: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (user && occasionId){
      getReceiveItemsByOccasionIdAndGiverId(occasionId, partnerId)
        .then((itemsArr) => {
          if (mounted) {
            setReceivingList(itemsArr);
          }
        })
        .catch(() => setReceivingList([]));
      getOccasionById(occasionId)
        .then((occasionObj) => {
          if (mounted) {
            setOccasion(occasionObj);
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
    id: '',
    occasionId: occasionId,
    giverId: partnerId,
    giverFirstName: partner.firstName,
    giverLastName: partner.lastName,
    itemName: '',
    itemDescription: '',
    itemURL: '',
    remarks: '',
    });
    setShowModal(true);
  };

  const handleGiftClick = (giftId) => {
    if (giftId !== void 0) {
      navigate(`/receiving/receiveGift/${giftId}`);
    }
  };

  const handlePartnerClick = (partnerId) => {
    if (partnerId !== void 0) {
      navigate(`/people/${partnerId}`);
    }
  }

  const handleEditClick = (item) => {
    setActiveObject(item);
    setShowModal(true);
  };
  
  const handleDeleteClick = (item) => {
    deleteReceiveItem(item.id).then((wasDeleted) => {
      if (wasDeleted) {
        getReceiveItemsByOccasionIdAndGiverId(occasionId, partnerId)
          .then((receivingArr) => setReceivingList(receivingArr));
        }
    });
  }
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='receiving-view'>
      <div className='page-title'>
         Receiving
      </div>
      { user && <div className='receiving-div'>
        <div className='receiving-list-outer-div'>
          <div className='receiving-title'>{occasion?.occasionName} {occasion?.occasionDate.split('T')[0]} </div> 
          { receivingList && receivingList.length > 0 ? <>
          <table className='receiving-list'>
            <thead>
            <tr className='table-header'>
              <th className='receiving-list-gift-header'>Gift</th>
              <th className='receiving-list-from-header'>Sender</th>
            </tr>
            </thead>
            <tbody>
            { receivingList.map((item) => <tr key={item.id}>
              <td className={`receiving-list-title has-thanked_${item.thanked}`} onClick={() => handleGiftClick(item.id)}>{item.itemName} </td>
              <td className='receiving-list-from' onClick={() => handlePartnerClick(item.giverId)}>
                {item.giverFirstName} {item.giverLastName} </td>
                <td>
                <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                  onClick={() => handleEditClick(item)}/>
                <FontAwesomeIcon icon={faTrash} className='delete-icon'
                  onClick={() => handleDeleteClick(item)}/> 
                </td>
            </tr>)}
            </tbody>
          </table> </> :  <> { receivingList && <div className='receiving-empty-message'>No Gifts!</div> } </> }
          { occasionId && 
          <div className='button-div'>
            <button className='add-receive-item-btn' onClick ={handleAddGiftClick}>Add Gift</button>
          </div> }
          <GTModal className='gt-modal' isOpen={showModal}>
            <GTModalContent className='modal-content'>
              <ReceiveItemForm user={user} item={activeObject}
                getReceiveItemsMethod={getReceiveItemsByOccasionIdAndGiverId}
                getReceiveItemsMethodArguments={[occasionId, partnerId]}
                partnerId={partnerId}
                setReceivingList={setReceivingList}
                occasionId={occasionId} 
                showModal={showModal} closeModal={closeModal} />
            </GTModalContent>
          </GTModal>
        </div>
      </div> }
    </div>
  );
};

SingleOccasionReceiving.propTypes = {
  user: PropTypes.any
};

export default SingleOccasionReceiving;

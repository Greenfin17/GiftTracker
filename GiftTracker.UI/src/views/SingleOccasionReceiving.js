import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
import ReceiveItemForm from '../components/forms/ReceiveItemForm';
import { getOccasionById } from '../helpers/data/occasionData';
import getReceiveItemsByOccasionId from '../helpers/data/receivingData';
import {
  getGiveItemsByOccasionAndRecipientId,
  deleteGiveItem
} from '../helpers/data/givingData';
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
    thanked: false
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
    if ( user && occasionId ) {
      getReceiveItemsByOccasionId(occasionId) 
        .then((resultList) => {
          if (mounted) {
            setReceivingList(resultList);
          }
        });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [user, occasionId ]);


  const handleAddGiftClick = () => {
    setActiveObject({
    occasionId: occasionId,
    giverId: '',
    giverFirstName: '',
    giverLastName: '',
    itemName: '',
    itemDescription: '',
    itemURL: '',
    remarks: '',
    thanked: false
    });
    setShowModal(true);
  };

  const handleGiftClick = (item) => {
    if (item !== void 0) {
      navigate('/receiving/receiveGift/${item.id');
    }
  };

  const handlePartnerClick = (item) => {
    if (item !== void 0) {
      navigate(`/people/${item.giverId}`);
    }
  };

  const handleEditClick = (item) => {
    setActiveObject(item);
    setShowModal(true);
  };
  
  const handleDeleteClick = (item) => {
    deleteGiveItem(item.id).then((wasDeleted) => {
      if (wasDeleted) {
        getReceiveItemsByOccasionId(occasionId).then((giftArr) => setReceivingList(giftArr));
        }
    });
  };
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='receiving-view'>
      <div className='page-title'>
         Receiving 
      </div>
      { user && occasion && <div className='giving-div'>
        <div className='receiving-list-outer-div'>
          <div className='giving-title'>{occasion?.occasionName} {occasion?.occasionDate.split('T')[0]} </div> 
          { receivingList && receivingList.length > 0 ? <>
          <table className='receiving-list'>
            <thead>
            <tr className='table-header'>
              <th className='receiving-list-gift-header'>Gift</th>
              <th className='receiving-list-sender-header'>Sender</th>
            </tr>
            </thead>
            <tbody>
            { receivingList.map((item) => <tr key={item.id}>
              <td className='receiving-list-title'onClick={() => handleGiftClick(item)}>{item.itemName} </td>
              <td className='receiving-list-recipient' onClick={() => handlePartnerClick(item)}>
                {item.giverFirstName} {item.giverLastName}</td>
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
            <button className='add-give-item-btn' onClick ={handleAddGiftClick}>Add Gift</button>
          </div> }
          <GTModal className='gt-modal' isOpen={showModal}>
            <GTModalContent className='modal-content'>
              <ReceiveItemForm user={user} item={item} occasionId={occasionId}
              setReceivingList={setReceivingList} closeModal={closeModal} /> /> /> />
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

import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getReceiveItemById } from '../helpers/data/receivingData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
import ReceiveItemForm from '../components/forms/ReceiveItemForm';
import thankedRed from '../resources/icons/noun-thank-3378092-red.min.svg';
import thankedGreen from '../resources/icons/noun-thank-3378092-green.min.svg';

const SingleReceiveGift = ({
  user
}) => {

  const { itemId } = useParams();
  const [receiveItem, setReceiveItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () =>{
    setShowModal(true);
  };

  const closeModal = () =>{
    setShowModal(false);
  };
  
  useEffect(() => {
    let mounted = true;
    if (user && itemId) {
      getReceiveItemById(itemId).then((itemObj => {
        if (mounted) {
          setReceiveItem(itemObj);
        }
      }));
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [user, itemId]);
  
  return (
    <div className='page-view single-receive-gift-view'>
      { receiveItem && <div className='page-title'>Received Gift Detail</div> }
      { user && receiveItem && <div className='single-gift-outer-div'>
        <div className='single-receive-gift-data-div'>
          <div className='single-receive-gift-name'><h2>{receiveItem.itemName}</h2></div> 
          <div className='single-receive-gift-description'>{receiveItem.itemDescription}</div> 
          <div className='single-receive-gift-giver-div'>From: {receiveItem.giverFirstName} {receiveItem.giverLastName}</div> 
          <div className='single-receive-gift-url'>{ receiveItem.itemURL ?  <a href={receiveItem.itemURL}>{receiveItem.itemURL}</a> : 'No link'}</div>
          <div className='single-receive-gift-reaction'>Remarks: {receiveItem.remarks}</div> 
          <div className='icon-div'>
            <div className='status-icon-div'>
              <img className='svg-icon' src={receiveItem.thanked? thankedGreen : thankedRed} alt='Thanked status' />
            </div>
            <div className='edit-icon-div'>
              <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                onClick={() => handleEditClick(receiveItem)}/>
            </div>
          </div>
        </div>
          <GTModal className='gt-modal' isOpen={showModal}>
            <GTModalContent className='modal-content'>
              <ReceiveItemForm user={user} item={receiveItem}
                getReceiveItemsMethod={getReceiveItemById}
                getReceiveItemsMethodArguments={[itemId]}
                setReceivingList={setReceiveItem}
                occasionId={receiveItem.occasionId} showModal={showModal} closeModal={closeModal} />
            </GTModalContent>
          </GTModal>
      </div> }
    </div>
  )
};

SingleReceiveGift.propTypes = {
  user: PropTypes.any
};

export default SingleReceiveGift;

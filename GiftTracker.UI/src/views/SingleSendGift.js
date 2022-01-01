import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getGiveItemById } from '../helpers/data/givingData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import emptyCartRed from '../resources/icons/empty-cart-red.min.svg';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
import GiveItemForm from '../components/forms/GiveItemForm';
import purchasedGreen from '../resources/icons/noun-purchase-1864312-green.min.svg';
import wrapped from '../resources/icons/gift.min.svg';
import wrappedGreen from '../resources/icons/gift-green.min.svg';
import shipped from '../resources/icons/shipping.min.svg';
import shippedGreen from '../resources/icons/shipping-green.min.svg';


const SingleSendGift = ({
  user
}) => {

  const emptyGuid = '00000000-0000-0000-0000-000000000000';
  const { itemId } = useParams();
  const [giveItem, setGiveItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () =>{
    console.warn('edit');
    setShowModal(true);
  };

  const closeModal = () =>{
    setShowModal(false);
  };
  
  const handleDeleteClick = () =>{
    console.warn('delete');
  };

  useEffect(() => {
    let mounted = true;
    if (user && itemId) {
      getGiveItemById(itemId).then((itemObj => {
        if (mounted) {
          setGiveItem(itemObj);
        }
      }));
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [user, itemId])
  
  return (
    <div className='page-view single-send-gift-view'>
      { giveItem && <div className='page-title'>Gift Detail</div> }
      { user && giveItem && <div className='single-gift-outer-div'>
        <div className='single-give-gift-data-div'>
          <div className='single-give-gift-name'><h2>{giveItem.itemName}</h2></div> 
          <div className='single-give-gift-description'>{giveItem.itemDescription}</div> 
          <div className='single-give-recipient-div'>To: {giveItem.recipientFirstName} {giveItem.recipientLastName}</div> 
          <div className='single-give-gift-type'>{ giveItem.wishListItemId === emptyGuid ? 'Surprise Gift' 
            : 'Wish List Item' } </div> 
          <div className='single-give-gift-URL'>Link: <a href={giveItem.merchantItemURL}>{giveItem.merchantItemURL}</a></div> 
          <div className='icon-div'>
            <div className='status-icons-div'>
              <img className='svg-icon' src={giveItem.purchased? purchasedGreen : emptyCartRed} alt='Purchased' />
              <img className='svg-icon' src={giveItem.wrapped? wrappedGreen : wrapped} alt='Wrapped' />
              <img className='svg-icon' src={giveItem.shipped? shippedGreen : shipped} alt='Shipped' />
            </div>
            <div className='edit-icon-div'>
              <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                onClick={() => handleEditClick(giveItem)}/>
              <FontAwesomeIcon icon={faTrash} className='delete-icon'
                onClick={() => handleDeleteClick(giveItem)}/>
            </div>
          </div>
        </div>
          <GTModal className='gt-modal' isOpen={showModal}>
            <GTModalContent className='modal-content'>
              <GiveItemForm user={user} item={giveItem} occasionId={giveItem.occasionId}
                partnerId={giveItem.recipientId} showModal={showModal}
                setGivingList={setGiveItem} getGiftsMethod={getGiveItemById} closeModal={closeModal} 
                getGiftsMethodArguments={[giveItem.id]} />
            </GTModalContent>
          </GTModal>
      </div> }
    </div>
  )
};

SingleSendGift.propTypes = {
  user: PropTypes.any
};

export default SingleSendGift;

import React, {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getGiveItemById } from '../helpers/data/givingData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
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
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});


const SingleSendGift = ({
  user
}) => {

  const emptyGuid = '00000000-0000-0000-0000-000000000000';
  const { itemId } = useParams();
  const [giveItem, setGiveItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () =>{
    setShowModal(true);
  };

  const handleListLinkClick = (giveItem) => { 
    if (giveItem.wishListItemId !== emptyGuid) {
      navigate(`/lists/${giveItem.recipientId}/${giveItem.occasionId}`);
    }
  }

  const closeModal = () =>{
    setShowModal(false);
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
          <div className='single-give-gift-recipient-div'>To: {giveItem.recipientFirstName} {giveItem.recipientLastName}</div> 
          <div className={`single-give-gift-type ${giveItem.wishListItemId !== emptyGuid ? 'clickable' : '' }`}
            onClick={() => handleListLinkClick(giveItem)}>{ giveItem.wishListItemId === emptyGuid ? 'Surprise Gift' 
            : 'Wish List Item' } </div> 
          <div className='single-give-gift-price-div'>Price: {currencyFormatter.format(giveItem.price)}</div> 
          <div className='single-give-gift-URL'  >Link: <a href={giveItem.merchantItemURL}>{giveItem.merchantItemURL}</a></div> 
          <div className='single-give-gift-reaction'>Reaction: {giveItem.reaction}</div> 
          <div className='icon-div'>
            <div className='status-icon-div'>
              <img className='svg-icon' src={giveItem.purchased? purchasedGreen : emptyCartRed} alt='Purchased' />
              <img className='svg-icon' src={giveItem.wrapped? wrappedGreen : wrapped} alt='Wrapped' />
              <img className='svg-icon' src={giveItem.shipped? shippedGreen : shipped} alt='Shipped' />
            </div>
            <div className='edit-icon-div'>
              <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                onClick={() => handleEditClick(giveItem)}/>
            </div>
          </div>
        </div>
          <GTModal className='gt-modal' isOpen={showModal}>
            <GTModalContent className='modal-content'>
              <GiveItemForm user={user} item={giveItem} occasionId={giveItem.occasionId}
                partnerId={giveItem.recipientId}
                setGivingList={setGiveItem} getGiftsMethod={getGiveItemById}
                showModal={showModal} closeModal={closeModal} 
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

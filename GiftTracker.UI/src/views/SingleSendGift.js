import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getGiveItemById } from '../helpers/data/givingData';


const SingleSendGift = ({
  user
}) => {

  const emptyGuid = '00000000-0000-0000-0000-000000000000';
  const { itemId } = useParams();
  const [giveItem, setGiveItem] = useState(null);

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
      { giveItem && <div className='page-title'>{giveItem?.itemName}</div> }
      { user && giveItem && <div className='single-gift-outer-div'>
        <div className='single-give-recipient-div'>To: {giveItem.recipientFirstName} {giveItem.recipientLastName}</div> 
        <div className='single-give-gift-type'>{ giveItem.wishListItemId === emptyGuid ? 'Surprise' : 'Wish List Item'}</div> 
        <div className='single-give-gift-name'>{giveItem.itemName}</div> 
        <div className='single-give-gift-description'>{giveItem.itemDescription}</div> 
      </div> }
    </div>
  )
};

SingleSendGift.propTypes = {
  user: PropTypes.any
};

export default SingleSendGift;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import purchased from '../../resources/icons/noun-purchase-1864312.min.svg';
import emptyCartRed from '../../resources/icons/empty-cart-red.min.svg';
import purchasedGreen from '../../resources/icons/noun-purchase-1864312-green.min.svg';
import wrapped from '../../resources/icons/gift.min.svg';
import wrappedGreen from '../../resources/icons/gift-green.min.svg';
import shipped from '../../resources/icons/shipping.min.svg';
import shippedGreen from '../../resources/icons/shipping-green.min.svg';
import { getGiveItemsByOccasionAndRecipientId } from '../../helpers/data/givingData';

const GiftStatusIcons = ({
  user,
  occasion,
  recipient
}) => {

  const [hasPurchased, setHasPurchased] = useState(false);
  const [hasWrapped, setHasWrapped] = useState(false);
  const [hasShipped, setHasShipped] = useState(false);

  useEffect(() => {
    let mounted = true;
    getGiveItemsByOccasionAndRecipientId(occasion.id, recipient.id)
      .then((gifts) => {
        gifts.forEach((gift) => {
          if (gift.purchased) setHasPurchased(true);
          if (gift.wrapped) setHasWrapped(true);
          if (gift.shipped) setHasShipped(true);
        });
      });
    return () => {
      mounted = false;
      return mounted;
    }
  }, [occasion.id, recipient.id]);

  return (
    <div className='gift-icon-outer-div'>
      { user && <div className='gift-status'>
          <img className='svg-icon' src={hasPurchased ? purchasedGreen : emptyCartRed} alt='Purchased' />
          <img className='svg-icon' src={hasWrapped ? wrappedGreen : wrapped} alt='Wrapped' />
          <img className='svg-icon' src={hasShipped ? shippedGreen : shipped} alt='Shipped' />
        </div> }
    </div>
  );

};

GiftStatusIcons.propTypes = {
  user: PropTypes.any,
  occasion: PropTypes.object,
  recipient: PropTypes.object
};

export default GiftStatusIcons;

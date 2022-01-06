import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import purchased from '../../resources/icons/noun-purchase-1864312.min.svg';
import thankedGreen from '../../resources/icons/noun-thank-3378092-green.min.svg'
import thankedRed from '../../resources/icons/noun-thank-3378092-red.min.svg'
import { getReceiveItemsByOccasionIdAndGiverId } from '../../helpers/data/receivingData';

const ReceivedGiftStatusIcons = ({
  user,
  occasion,
  giver 
}) => {

  const [hasReceived, setHasReceived] = useState(false);
  const [hasThanked, setHasThanked] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (occasion.id && giver.id){
     getReceiveItemsByOccasionIdAndGiverId(occasion.id, giver.id)
        .then((gifts) => {
          gifts.forEach((gift) => {
            if (mounted){
              setHasReceived(true)
              if (!gift.thanked) setHasThanked(false);
            }
          });
        });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [occasion.id, giver.id]);

  return (
    <div className='gift-icon-outer-div'>
      { user && hasReceived && <div className='gift-status'>
          <img className='svg-icon' src={hasThanked ? thankedGreen : thankedRed } alt='Thanked' />
        </div> }
    </div>
  );

};

ReceivedGiftStatusIcons.propTypes = {
  user: PropTypes.any,
  occasion: PropTypes.object,
  recipient: PropTypes.object
};

export default ReceivedGiftStatusIcons;

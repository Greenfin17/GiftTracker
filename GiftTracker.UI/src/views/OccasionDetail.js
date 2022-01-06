import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getOccasionById } from '../helpers/data/occasionData';
import { getExchangePartnersByUserId } from '../helpers/data/exchangePartnerData';
import GiftStatusIcons from '../components/symbols/GiftStatus';
import { getReceiveItemsByOccasionId } from '../helpers/data/receivingData';
import thankedRed from '../resources/icons/noun-thank-3378092-red.min.svg';
import thankedGreen from '../resources/icons/noun-thank-3378092-green.min.svg';
const OccasionDetailView = ({
  user
}) => {

  const { occasionId } = useParams();
  const navigate = useNavigate('/');
  const [occasion, setOccasion] = useState({});
  const [xPartners, setXPartners] = useState([]);
  const [receivedGifts, setReceivedGifts] = useState([]);

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
    if (user){
      getExchangePartnersByUserId(user.id).then((partnerList) => {
        if (mounted) {
          setXPartners(partnerList);
        }
      });
    };
    return () => {
      mounted = false;
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;
    if (user && occasionId) {
      getReceiveItemsByOccasionId(occasionId).then((giftList) => {
        if (mounted) {
          setReceivedGifts(giftList);
        }
      })
    }
    return () => {
      mounted = false;
    }
  }, [user, occasionId])

  
  const handleClick = (partner)=> {
    navigate(`/occasions/${occasionId}/people/${partner.id}`);
  };

  const handleReceivedGiftClick = (gift) => {
    // navigate(`/occasions/${occasionId}/giftGiver/${gift.giverId}`);
    navigate(`/receiving/receiveGift/${gift.id}`);
  }
 

  return (
    <div className='page-view occasion-detail-view'>
      { occasion.occasionName && <div className='page-title'>{occasion?.occasionName} {occasion?.occasionDate.split('T')[0]}</div>}
      { user && <div className='occasion-div'>
        <div className='section-heading'>Giving Status</div>
        <div className='list-div'>
          <ul className='occasion-detail-ul'>
            { xPartners && xPartners.length > 0 ? xPartners.map((xPartner) => <li key={xPartner.id}
              className='gift-status' onClick={() => handleClick(xPartner)}>
              <GiftStatusIcons user={user} occasion={occasion} recipient={xPartner} />
              <div className='partner-name'>{xPartner.firstName} {xPartner.lastName}</div>
              </li>) : <div className = 'occasion-detail-no-data'>No gift exchange partners</div> }</ul>
        </div>
        <div className='section-heading'>Receiving Status</div>
        <div className='list-div'>
          <ul className='occasion-detail-ul'>
            { receivedGifts && receivedGifts.length > 0 ? receivedGifts.map((receivedGift) => <li key={receivedGift.id}
              className='gift-status' onClick={() => handleReceivedGiftClick(receivedGift)}>
                <div className='gift-icon-outer-div gift-status'>
                  <img className='svg-icon' src={receivedGift.thanked? thankedGreen : thankedRed} alt='Purchased' />
                </div>
                <div className='partner-name'>{receivedGift.giverFirstName} {receivedGift.giverLastName}</div>
              </li>) : <div className = 'occasion-detail-no-data'>No gifts received</div> }
          </ul>
        </div>
      </div> }
    </div>
  );
};

OccasionDetailView.propTypes = {
  user: PropTypes.any
};

export default OccasionDetailView;

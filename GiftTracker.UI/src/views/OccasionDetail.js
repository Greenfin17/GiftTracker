import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getOccasionById } from '../helpers/data/occasionData';
import { getExchangePartnersByUserId } from '../helpers/data/exchangePartnerData';
import GiftStatusIcons from '../components/symbols/GiftStatus';
import ReceivedGiftStatusIcons from '../components/symbols/ReceivedGiftStatus';

const OccasionDetailView = ({
  user
}) => {

  const { occasionId } = useParams();
  const navigate = useNavigate('/');
  const [occasion, setOccasion] = useState({});
  const [xPartners, setXPartners] = useState([]);

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

  const handleClick = (partner)=> {
    navigate(`/occasions/${occasionId}/people/${partner.id}`);
  };

  const handleReceivedGiftClick = (partner) => {
    navigate(`/occasions/${occasionId}/giftGiver/${partner.id}`);
    // navigate(`/receiving/receiveGift/${gift.id}`);
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
            { xPartners && xPartners.length > 0 ? xPartners.map((xPartner) => <li key={xPartner.id}
              className='gift-status' onClick={() => handleReceivedGiftClick(xPartner)}>
                <div className='gift-icon-outer-div gift-status'>
                <ReceivedGiftStatusIcons user={user} occasion={occasion} giver={xPartner} />
                </div>
                <div className='partner-name'>{xPartner.firstName} {xPartner.lastName}</div>
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

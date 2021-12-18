import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getExchangePartners } from '../helpers/data/exchangePartnerData';

const People = ({
  user
}) => {
  const [exchangePartners, setExchangePartners] = useState([]);

  useEffect(() => {
    let mounted = true;
    getExchangePartners().then((partnerList) => {
      if (mounted && partnerList?.length > 0) {
        setExchangePartners(partnerList);
      }
    })
    return () => {
      mounted = false;
      return mounted;
    };
  }, []);

  const partnerClick = (partnerId) => {
    console.warn(partnerId);
  };


  return (
    <div className='people-view'>
      <div className='page-title'>
        People
      </div>
    <div className='partner-div'>
      <div className='partner-list-div'>
        { exchangePartners ? exchangePartners?.map((partner) => <div key={partner.id}
            className='partner-list-line' onClick={() => partnerClick(partner.id)}>
            {partner.firstName} {partner.lastName}</div>) : <div>No exchange partners</div> }
      </div>
      <div className='button-div'>
        <button className='add-partner'>Add Exchange Partner</button>
      </div>
    </div>
    </div>
  );
};

People.propTypes = {
  user: PropTypes.any
}

export default People;

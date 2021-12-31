import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { getOccasionsByUserId } from '../helpers/data/occasionData';
import { getExchangePartnersByUserId } from '../helpers/data/exchangePartnerData';
import Avatar from '../components/symbols/Avatar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
/*
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
*/

const Lists = ({
  user
}) => {
  const navigate = useNavigate();
  const [occasionOptions, setOccasionOptions] = useState([]);
  const [occasionId, setOccasionId] = useState('');
  const [exchangePartners, setExchangePartners] = useState([]);
  
  useEffect(() => {
    const optionsArr =  [];
    let mounted = true;
    if (user) {
      getOccasionsByUserId(user.id).then((resultArr) => {
        for (let i = 0; i < resultArr.length; i += 1) {
          const option = {
            value: resultArr[i].id,
            label: `${resultArr[i].occasionName}: ${resultArr[i].occasionDate.substring(0, 10)}`
          };
          optionsArr.push(option);
        }
        if (mounted) setOccasionOptions(optionsArr);
      })
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [user]);
  
  useEffect(() => {
    let mounted = true;
    if (user) {
      getExchangePartnersByUserId(user.id).then((partnerList) => {
        if (mounted && partnerList?.length > 0) {
          setExchangePartners(partnerList);
        }
      });
    }
    return () => {
      mounted = false;
      return mounted;
    };
  }, [user]);
            
  
  const handleSelectClick = (e) => {
    setOccasionId(e.value);
  };

  const handlePartnerClick = (partner) => {
    if (occasionId) navigate(`/lists/${partner.id}/${occasionId}`);
    else navigate(`/lists/${partner.id}`);
  };

  return (
    <div className='lists-view'>
      <div className='page-title'>
         Lists
      </div>
      { user && <><div className='lists-div'>
        <div className='lists-select-occasion'>
          <Select options={occasionOptions} onChange={handleSelectClick}
            placeholder='Select Occasion...'/>
        </div> 
        <div className='list-div'>
          <ul className='ul-list'>
            { exchangePartners ? exchangePartners?.map((partner) => <li key={partner.id}
                className='partner-list-line' onClick={() => handlePartnerClick(partner)}>
                <Avatar partner={partner} />
                <div className='partner-name'>{partner.firstName} {partner.lastName}</div>
              </li>) : <div>No exchange partners</div> }
          </ul>
        </div>
      </div>
      </>
      }
    </div>
  );
};

Lists.propTypes = {
  user: PropTypes.any
};

export default Lists;

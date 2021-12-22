import React from 'react';
import PropTypes from 'prop-types';
// import Select from 'react-select';
// import { getExchangePartnersByUserId } from '../../helpers/data/exchangePartnerData';
// import { getReceiveItemsByOccasionId } from '../../helpers/data/receivingData';

const GiveItemForm = ({
  item,
  closeModal
}) => {

  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Receive Item Form
        <span className='x-out' onClick={closeModal}>x</span>
      </div>
      <div>
        {item.itemName}
      </div>
    </div>
  );

}

GiveItemForm.propTypes = {
  item: PropTypes.object,
  closeModal: PropTypes.func
};

export default GiveItemForm;

import React from 'react';
import PropTypes from 'prop-types';
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const OccasionSummaryCard = ({
  occasion
}) => (
    <div className='occasion-list-data'>
      <div className='occasion-title'>{occasion.occasionName}</div>
      <div className='occasion-date'>{occasion.occasionDate.substring(0,10)}</div>
      <div className='occasion-location'>{occasion.occasionLocation}</div>
      <div className='occasion-budget'>{currencyFormatter.format(occasion.occasionBudget)}</div>
    </div>
);

OccasionSummaryCard.propTypes = {
  occasion: PropTypes.object
};

export default OccasionSummaryCard;

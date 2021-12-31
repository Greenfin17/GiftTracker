import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const OccasionSummaryCard = ({
  occasion
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/occasions/${occasion.id}`);
  };
  return (
    <div className='occasion-list-data' onClick={handleClick}>
      <div className='occasion-title'>{occasion.occasionName}</div>
      <div className='occasion-date'>{occasion.occasionDate.substring(0,10)}</div>
      <div className='occasion-location'>{occasion.occasionLocation}</div>
      <div className='occasion-budget'>{currencyFormatter.format(occasion.occasionBudget)}</div>
    </div>
  );
};

OccasionSummaryCard.propTypes = {
  occasion: PropTypes.object
};

export default OccasionSummaryCard;

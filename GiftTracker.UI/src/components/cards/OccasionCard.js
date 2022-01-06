import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import { getTotalSpentByOccasion } from '../../helpers/data/givingData'; 
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const OccasionSummaryCard = ({
  occasion,
  index
}) => {
  const [totalSpent, setTotalSpent] = useState(0.0);
  const navigate = useNavigate();
  const textRef = useRef();
  const graphRef = useRef();
  const handleClick = () => {
    navigate(`/occasions/${occasion.id}`);
  };

  useEffect(() => {
    let mounted = true;
    if (occasion.id) {
      getTotalSpentByOccasion(occasion.id).then((result) => {
        if (mounted) {
          setTotalSpent(result);
        }
      });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [occasion.id]);

  useEffect(() => {
    let mounted = true;
    const size = 120;
    // d3.select(`card_${index}`).remove();
    const width = 100;
    const height = 120;
    const svg = d3.select(graphRef.current)
      .attr('width', width)
      .attr('height', height);
    if (totalSpent){
      d3.selectAll(`.card_${index}> g`).remove();
      d3.selectAll(`.card_${index}> rect`).remove();
      let dataValue = totalSpent / occasion.occasionBudget * height;
      if (dataValue > height) dataValue = height;
      let barColor = totalSpent <= occasion.occasionBudget  ? 'green' : 'red';

      const dataSet = [  totalSpent / occasion.occasionBudget * height];

      const margin = { left: 35, top: 5, right: 5, bottom: 5};
      // make y scale with 5 ticks
      const yScale = d3.scaleLinear()
        .domain([0, occasion.occasionBudget]).nice()
        .range([height - margin.bottom, margin.top]);
      svg.append('g').call(d3.axisLeft(yScale).ticks(5))
        .attr('transform', `translate(${margin.left},0)`);
      
      let rect_width = 30;
      svg.selectAll('rect')
        .data(dataSet)
        .enter()
        .append('rect')
        .attr('x', (d, i) => 40 + i*(rect_width + 5))
        .attr('y', d => size - d - margin.bottom + 2)
        .attr('width', rect_width)
        .attr('height', d => d)
        .attr('fill',  barColor);
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [index, occasion.occasionBudget, totalSpent])

  return (
    <div className='occasion-card-outer-div' onClick={handleClick}>
      <div className='occasion-card-data'>
        <div className='occasion-card-data-item'>{occasion.occasionDate.substring(0,10)}</div>
        <div className='occasion-card-data-item'>{occasion.occasionLocation}</div>
        <div className='occasion-card-data-item'>Budget: {currencyFormatter.format(occasion.occasionBudget)}</div>
        <div className='occasion-card-data-item'>Spent: {currencyFormatter.format(totalSpent)}</div>
      </div>
      <div className='occasion-card-graph-div'>
        <div ref={textRef} className='budget-graph-div'></div>
          <svg ref={graphRef} className={`card_${index} card-graph`}></svg>
      </div>
    </div>
  );
};

OccasionSummaryCard.propTypes = {
  occasion: PropTypes.object,
  index: PropTypes.number
};

export default OccasionSummaryCard;

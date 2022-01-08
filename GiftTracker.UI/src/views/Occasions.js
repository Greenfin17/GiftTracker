import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { getOccasionsByUserId, deleteOccasion } from '../helpers/data/occasionData';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
import OccasionSummaryCard from '../components/cards/OccasionCard';
import OccasionForm from '../components/forms/OccasionForm';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Occasions = ({
  user
}) => {
  const [occasionList, setOccasionList] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState({
    id: '',
    occasionCreatorId: '',
    occasionName: '',
    occasionDate: '',
    occasionLocation: '',
    occasionBudget: ''
  })

  useEffect(() => {
    let mounted = true;
    if (user) {
      getOccasionsByUserId(user.id).then((responseList) => {
        if (mounted) {
          setOccasionList(responseList);
        }
      });
    }
    return () => {
      return mounted = false;
    }
  }, [user])
  
  const handleEditClick = (occasion) => { 
    setActiveObject(occasion);
    setShowModal(true);
  };

  const handleDeleteClick = (occasion) => {
    deleteOccasion(occasion.id).then((wasDeleted) => {
      if(wasDeleted) {
        getOccasionsByUserId(user.id).then((responseList) => {
          setOccasionList(responseList);
        });
      }
    });
  }
  const handleAddOccasionClick = () => {
    setActiveObject({});
    setShowModal(true);
  }
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='occasion-view'>
      <div className='page-title'>
         Occasions
      </div>
      { user &&
      <div className='occasion-div'>
        <div className='occasion-outer-container'>
          <div className='occasion-list-div'>
            <ul className='occasion-list'>
              { occasionList ? occasionList?.map((occasion, index) => <li key={occasion.id}
                  className='occasion-list-line' >
                  <div className='occasion-list-title'>{occasion.occasionName}</div>
                  <div className='occasion-list-data'>
                    <OccasionSummaryCard occasion={occasion} index={index} />
                    <div className='occasion-list-icons'>
                      <div className='occasion-icon-group'>
                        <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                          onClick={() => handleEditClick(occasion)}/>
                        <FontAwesomeIcon icon={faTrash} className='delete-icon'
                          onClick={() => handleDeleteClick(occasion)}/>
                      </div>
                    </div> 
                  </div>
                </li>) : <div>No Occasions</div> }
              </ul>
            </div>
            <div className='button-div'>
              <button className='add-occasion-btn' onClick = {handleAddOccasionClick}>Add Occasion</button>
            </div>
          </div>
        <GTModal className='gt-modal' isOpen={showModal}>
          <GTModalContent className='modal-content'>
            <OccasionForm user={user} occasion={activeObject}
              setOccasionList={setOccasionList}
              showModal={showModal} closeModal={closeModal} />
          </GTModalContent>
        </GTModal>
      </div> }
    </div>
  );
};

Occasions.propTypes = {
  user: PropTypes.any
};

export default Occasions;


import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
import GiveItemForm from '../components/forms/GiveItemForm';
import { getOccasionsByUserId } from '../helpers/data/occasionData';
import { getGiveItemsByOccasionId, deleteGiveItem } from '../helpers/data/givingData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const GivingByRoute = ({
  user
}) => {
  const { occasionId } = useParams();
  const emptyGuid = '00000000-0000-0000-0000-000000000000';
  const blankItem = {
    id: '',
    occasionId: emptyGuid,
    recipientId: emptyGuid,
    wishListItemId: emptyGuid,
    itemName: '',
    itemDescription: '',
    merchantItemURL: '',
    price: 0,
    purchased: false,
    wrapped: false,
    shipped: false,
    reaction: ''
  }
  const [givingList, setGivingList] = useState(false);
  const [occasionOptions, setOccasionOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState(blankItem);
  const navigate = useNavigate();

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
    if (user && occasionId) {
      getGiveItemsByOccasionId(occasionId)
      .then((itemsArr) => {
        setGivingList(itemsArr);
      })
      .catch(() => setGivingList([]));

    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [user, occasionId]);

  const handleSelectClick = (e) => {
    navigate(`/giving/${e.value}`);
  }

  const handleAddGiftClick = () => {
    setActiveObject(blankItem);
    setShowModal(true);
  };

  const handleGiftClick = (item) => {
    if (item !== void 0) {
      navigate(`/giving/sendGift/${item.id}`);
    }
  };

  const handlePersonClick = (item) => {
    if (item) {
      navigate(`/people/${item.recipientId}`);
    }
  }

  const handleEditClick = (item) => {
    setActiveObject(item);
    setShowModal(true);
  };
  
  const handleDeleteClick = (item) => {
    deleteGiveItem(item.id).then((wasDeleted) => {
      if (wasDeleted) {
        getGiveItemsByOccasionId(occasionId).then((givingArr) => setGivingList(givingArr));
        }
    });
  };
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='giving-view'>
      <div className='page-title'>
         Giving
      </div>
      { user && <div className='giving-div'>
        <div className='giving-select-occasion'>
          <Select options={occasionOptions} onChange={handleSelectClick}
            placeholder='Select Occasion...'/>
        </div> 
        <div className='giving-list-outer-div'>
          { givingList && givingList.length > 0 ? <>
          <table className='giving-list'>
            <thead>
            <tr className='table-header'>
              <th className='giving-list-gift-header'>Gift</th>
              <th className='giving-list-recipient-header'>Recipient</th>
            </tr>
            </thead>
            <tbody>
            { givingList.map((item) => <tr key={item.id}>
              <td className='giving-list-title'onClick={() => handleGiftClick(item)}>{item.itemName} </td>
              <td className='giving-list-recipient' onClick={() => handlePersonClick(item)}>
                {item.recipientFirstName} {item.recipientLastName}</td>
                <td>
                <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                  onClick={() => handleEditClick(item)}/>
                <FontAwesomeIcon icon={faTrash} className='delete-icon'
                  onClick={() => handleDeleteClick(item)}/> 
                </td>
            </tr>)}
            </tbody>
          </table> </> :  <> { givingList && <div className='giving-empty-message'>No Gifts!</div> } </> }
          { occasionId && 
          <div className='button-div'>
            <button className='add-give-item-btn' onClick ={handleAddGiftClick}>Add Gift</button>
          </div> }
          <GTModal className='gt-modal' isOpen={showModal}>
            <GTModalContent className='modal-content'>
              <GiveItemForm user={user} item={activeObject} occasionId={occasionId}
                partnerId={activeObject.recipientId} showModal={showModal}
                setGivingList={setGivingList} getGiftsMethod={getGiveItemsByOccasionId}
                getGiftsMethodArguments={[occasionId]} closeModal={closeModal} />
            </GTModalContent>
          </GTModal>
        </div>
      </div> }
    </div>
  );
};

GivingByRoute.propTypes = {
  user: PropTypes.any
};

export default GivingByRoute

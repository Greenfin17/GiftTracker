import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
import ReceiveItemForm from '../components/forms/ReceiveItemForm';
import { getOccasionsByUserId } from '../helpers/data/occasionData';
import { getReceiveItemsByOccasionId, deleteReceiveItem } from '../helpers/data/receivingData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const ReceivingByRoute = ({
  user
}) => {
  const { occasionId } = useParams();
  const [receivingList, setReceivingList] = useState(false);
  const [occasionOptions, setOccasionOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState({
    id: '',
    occasionId: '',
    giverId: '',
    itemName: '',
    itemDescription: '',
    itemURL: '',
    remarks: '',
  });
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

  const handleSelectClick = (e) => {
    navigate(`/receiving/${e.value}`);
  };

  useEffect(() => {
    let mounted = true;
    if (user && occasionId){
      getReceiveItemsByOccasionId(occasionId)
        .then((itemsArr) => {
          if (mounted) {
            setReceivingList(itemsArr);
          }
        })
        .catch(() => setReceivingList([]));
      }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [user, occasionId]);

  const handleAddGiftClick = () => {
    setActiveObject({});
    setShowModal(true);
  };

  const handleGiftClick = (giftId) => {
    if (giftId !== void 0) {
      navigate(`/gifts/receiveGift/${giftId}`);
    }
  };

  const handlePartnerClick = (partnerId) => {
    if (partnerId !== void 0) {
      navigate(`/people/${partnerId}`);
    }
  }

  const handleEditClick = (item) => {
    setActiveObject(item);
    setShowModal(true);
  };
  
  const handleDeleteClick = (item) => {
    deleteReceiveItem(item.id).then((wasDeleted) => {
      if (wasDeleted.status === 200) {
        getReceiveItemsByOccasionId(occasionId)
          .then((receivingArr) => setReceivingList(receivingArr));
        }
    });
  }
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='receiving-view'>
      <div className='page-title'>
         Receiving
      </div>
      { user && <div className='receiving-div'>
        <div className='receiving-select-occasion'>
          <Select options={occasionOptions} onChange={handleSelectClick}
            placeholder='Select Occasion...'/>
        </div> 
        <div className='receiving-list-outer-div'>
          { receivingList && receivingList.length > 0 ? <>
          <table className='receiving-list'>
            <thead>
            <tr className='table-header'>
              <th className='receiving-list-gift-header'>Gift</th>
              <th className='receiving-list-from-header'>Sender</th>
            </tr>
            </thead>
            <tbody>
            { receivingList.map((item) => <tr key={item.id}>
              <td className='receiving-list-title'onClick={() => handleGiftClick(item.id)}>{item.itemName} </td>
              <td className='receiving-list-from' onClick={() => handlePartnerClick(item.giverId)}>
                {item.giverFirstName} {item.giverLastName} </td>
                <td>
                <FontAwesomeIcon className='edit-icon' icon={faEdit} 
                  onClick={() => handleEditClick(item)}/>
                <FontAwesomeIcon icon={faTrash} className='delete-icon'
                  onClick={() => handleDeleteClick(item)}/> 
                </td>
            </tr>)}
            </tbody>
          </table> </> :  <> { receivingList && <div className='receiving-empty-message'>No Gifts!</div> } </> }
          { occasionId && 
          <div className='button-div'>
            <button className='add-receive-item-btn' onClick ={handleAddGiftClick}>Add Gift</button>
          </div> }
          <GTModal className='gt-modal' isOpen={showModal}>
            <GTModalContent className='modal-content'>
              <ReceiveItemForm user={user} item={activeObject} setReceivingList={setReceivingList}
                occasionId={occasionId} closeModal={closeModal} />
            </GTModalContent>
          </GTModal>
        </div>
      </div> }
    </div>
  );
};

ReceivingByRoute.propTypes = {
  user: PropTypes.any
};

export default ReceivingByRoute;

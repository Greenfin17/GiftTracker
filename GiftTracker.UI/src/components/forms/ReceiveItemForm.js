import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
// import Select from 'react-select';
import { getExchangePartnersByUserId } from '../../helpers/data/exchangePartnerData';
import {
  addReceiveItem,
  updateReceiveItem
} from '../../helpers/data/receivingData';

const ReceiveItemForm = ({
  user,
  item,
  occasionId,
  getReceiveItemsMethod,
  getReceiveItemsMethodArguments,
  setReceivingList,
  showModal,
  closeModal
}) => {
  const emptyGuid = '00000000-0000-0000-0000-000000000000';
  const [giverOptions, setGiverOptions] = useState([]);
  const [giverProfile, setGiverProfile] = useState(false);
  const [itemProfile, setItemProfile] = useState({
    occasionId: occasionId,
    giverId: item.giverId || emptyGuid, 
    itemName: item.itemName || '',
    itemDescription: item.itemDescription || '',
    itemURL: item.itemURL || '',
    remarks: item.remarks || '',
    thanked: item.thanked || false
  });
  
  useEffect(() => {
    let mounted = true;
    if (user && mounted) {
      setItemProfile ({
        occasionId: occasionId,
        giverId: item.giverId || emptyGuid, 
        itemName: item.itemName || '',
        itemDescription: item.itemDescription || '',
        itemURL: item.itemURL || '',
        thanked: item.thanked || false,
        remarks: item.remarks || ''
      });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [user, occasionId, item, showModal ]);

  
  useEffect(() => {
    // setup select for exchange partners
    let mounted = true;
    let optionsArr = [];
    if (user) {
      getExchangePartnersByUserId(user.id).then((resultArr) => {
        for ( let i = 0; i < resultArr.length; i += 1){
          const option = {
            value: resultArr[i].id,
            label: `${resultArr[i].firstName} ${resultArr[i].lastName}`
          };
          optionsArr.push(option);
        }
          if (mounted) setGiverOptions(optionsArr);
        });
    }
    return () => {
      mounted = false;
      return false;
    }
  }, [user]);

  
  useEffect(() => {
    let mounted = true;
    if (item && item.giverId !== undefined && item.giverId !== '' && mounted) {
      setGiverProfile({
        value: item.giverId,
        label: `${item.giverFirstName} ${item.giverLastName}`
      })
    }
    else {
      setGiverProfile(false);
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [item]);

  const handleChange = (e) => {
    setItemProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value ? e.target.value: ''
    }));
  };

  const handleSelectClick = (e) => {
    if (e !== null){
      setItemProfile((prevState) => ({
        ...prevState,
        giverId: e.value
      }));
      if (e.value !== undefined && e.label !== undefined){
        setGiverProfile((prevState) => ({
          ...prevState,
          value: e.value,
          label: e.label
        }));
      } else setGiverProfile(false);
    }
  };

  const handleSubmit = () => {
    // no item so this is a new gift
    if (!item.id) {
      addReceiveItem(itemProfile).then((result) => {
        if (result) {
          getReceiveItemsMethod(...getReceiveItemsMethodArguments)
          .then((itemsArr) => setReceivingList(itemsArr));
        }
      });
    } else {
      updateReceiveItem(item.id, itemProfile).then((wasUpdated) => {
        if (wasUpdated) {
          getReceiveItemsMethod(...getReceiveItemsMethodArguments)
          .then((itemsArr) => {
            setReceivingList(itemsArr);
          });
        }
      });
    }
    closeModal();
    setGiverProfile(false);
  };
  
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Receive Item Form
        <span className='x-out' onClick={closeModal}>x</span>
      </div>
      <div className='form-recipient-select'>
          <Select options={giverOptions} onChange={handleSelectClick}
            placeholder='Select a gift giver...'
            name='giverId'
            value={giverProfile || ''} />
      </div>
      <div className='form-group'>
        <label className='input-label' htmlFor='itemName'>Gift Name</label>
            <input className='form-input' type='text' name='itemName' value={itemProfile.itemName}
                  label='itemName' onChange={handleChange} />
        <label className='input-label' htmlFor='itemDescription'>Gift Description</label>
            <input className='form-input' type='text' name='itemDescription' value={itemProfile.itemDescription}
                  label='itemDescription' onChange={handleChange} />
        <label className='input-label' htmlFor='itemURL'>Gift URL link</label>
            <input className='form-input' type='text' name='itemURL' value={itemProfile.itemURL}
                  label='itemURL' onChange={handleChange} />
        <label className='input-label' htmlFor='remarks'>Remarks</label>
            <input className='form-input' type='text' name='remarks' value={itemProfile.remarks}
                  label='remarks' onChange={handleChange} />
        <div className='inline-checkbox'>
          <input className='form-input inline-checkbox-input' type='checkbox' name='thanked' 
            value={itemProfile.thanked} checked={itemProfile.thanked}
            label='thanked' onChange={handleChange} />
          <label className='input-label' htmlFor='thanked'>Thanked</label>
        </div>
      </div>
      <div className='button-div'>
        <button className='close-button' onClick={handleCloseModal}>Close</button>
        <button className='submit-button' onClick={handleSubmit}
                disabled={itemProfile.giverId === emptyGuid || !itemProfile.itemName.length}>Submit</button>
      </div>
    </div>
  );

}

ReceiveItemForm.propTypes = {
  user: PropTypes.any,
  item: PropTypes.object,
  occasionId: PropTypes.string,
  getReceiveItemsMethod: PropTypes.func,
  getReceiveItemsMethodArguments: PropTypes.array,
  setReceivingList: PropTypes.func,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func
};

export default ReceiveItemForm;

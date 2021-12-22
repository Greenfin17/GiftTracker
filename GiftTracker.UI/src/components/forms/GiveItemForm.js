import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { getExchangePartnersByUserId } from '../../helpers/data/exchangePartnerData';
import { getGiveItemsByOccasionId, addGiveItem, updateGiveItem } from '../../helpers/data/givingData';

const GiveItemForm = ({
  user,
  item,
  occasionId,
  setGivingList,
  closeModal,
}) => {

  const emptyGuid = '00000000-0000-0000-0000-000000000000';
  const [recipientOptions, setRecipientOptions] = useState({});
  const [recipientId, setRecipientId] = useState(emptyGuid);
  const [defaultRecipient, setDefaultRecipient] = useState(false);
  const [itemProfile, setItemProfile] = useState({
    occasionId: occasionId,
    recipientId: item.recipientId || emptyGuid, 
    wishListItemId: item.wishListItemId || emptyGuid,
    itemName: item.itemName || '',
    itemDescription: item.itemDescription || '',
    merchantItemURL: item.merchantItemURL || '',
    price: item.price || 0,
    purchased: item.purchased || false,
    wrapped: item.wrapped || false,
    shipped: item.shipped || false,
    reaction: item.reaction || ''
  });

  useEffect(() => {
    let mounted = true;
    if (user && mounted) {
      setItemProfile ({
        occasionId: occasionId,
        recipientId: item.recipientId || emptyGuid,
        wishListItemId: item.wishListItemId || emptyGuid,
        itemName: item.itemName || '',
        itemDescription: item.itemDescription || '',
        merchantItemURL: item.merchantItemURL || '',
        price: item.price || 0,
        purchased: item.purchased || false,
        wrapped: item.wrapped || false,
        shipped: item.shipped || false,
        reaction: item.reaction || ''
      });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [user, occasionId, item ]);

  useEffect(() => {
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
        if (mounted) setRecipientOptions(optionsArr);
      });
    }
    return () => {
      mounted = false;
      return false;
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;
    if (item && item.recipientId !== undefined && mounted) {
      setDefaultRecipient({
        value: item.recipientId,
        label: `${item.recipientFirstName} ${item.recipientLastName}`
      });
      setRecipientId(item.recipientId);
    }
    else {
      setDefaultRecipient(false);
      setRecipientId(emptyGuid);
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [item])

  const handleSelectClick = (e) => {
    setRecipientId(e.value);
    setItemProfile((prevState) => ({
      ...prevState,
      recipientId: e.value
    }));
  };
  
  const handleChange = (e) => {
    setItemProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value ? e.target.value: ''
    }));
  };

  const handleSubmit = () => {
    console.warn('submit gift');
    const submitObj = {
      ...itemProfile,
      recipientId: recipientId
    };
    // no item so this is a new gift
    if (!item.id) {
      addGiveItem(submitObj).then((result) => {
        if (result) {
          getGiveItemsByOccasionId(occasionId)
          .then((itemsArr) => setGivingList(itemsArr));
        }
      });
    } else {
      updateGiveItem(item.id, itemProfile).then((result) => {
        if (result) {
          getGiveItemsByOccasionId(occasionId)
          .then((itemsArr) => setGivingList(itemsArr));
        }
      });
    }
    closeModal();
    setDefaultRecipient(false);
  };

  const handleCloseModal = () => {
    if (item.id === undefined) {
      setDefaultRecipient({
        value: null,
        label: 'Select a Recipient'
      });
    }
    closeModal();
  }

  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Edit Gift Item
        <span className='x-out' onClick={closeModal}>x</span>
      </div>
      <div className='form-recipient-select' key={defaultRecipient.value} >
          <Select options={recipientOptions} onChange={handleSelectClick}
            placeholder='Select a recipient...'
            name='recipientId'
            defaultValue={defaultRecipient} />
      </div>
      <div className='form-group'>
        <label className='input-label' htmlFor='itemName'>Gift Name</label>
            <input className='form-input' type='text' name='itemName' value={itemProfile.itemName}
                  label='name' onChange={handleChange} />
        <label className='input-label' htmlFor='itemDescription'>Gift Description</label>
            <input className='form-input' type='text' name='itemDescription' value={itemProfile.itemDescription}
                  label='description' onChange={handleChange} />
        <label className='input-label' htmlFor='merchantItemURL'>Merchant URL</label>
            <input className='form-input' type='text' name='merchantItemURL' value={itemProfile.merchantItemURL}
                  label='merchantURL' onChange={handleChange} />
        <label className='input-label' htmlFor='price'>Price</label>
            <input className='form-input' type='number' step='.01' name='price' value={itemProfile.price}
                  label='price' onChange={handleChange} />
        <div className='inline-checkbox'>
          <input className='form-input inline-checkbox-input' type='checkbox' name='purchased' value={itemProfile.purchased}
                    label='purchased' onChange={handleChange} />
          <label className='input-label inline-checkbox-label' htmlFor='purchased'>Purchased</label>
        </div>
        <div className='inline-checkbox'>
          <input className='form-input inline-checkbox-input' type='checkbox' name='wrapped' value={itemProfile.wrapped}
                    label='wrapped' onChange={handleChange} />
          <label className='input-label inline-checkbox-label' htmlFor='wrapped'>Wrapped</label>
        </div>
        <div className='inline-checkbox'>
          <input className='form-input inline-checkbox-input' type='checkbox' name='shipped' value={itemProfile.shipped}
                    label='shipped' onChange={handleChange} />
          <label className='input-label inline-checkbox-label' htmlFor='shipped'>Shipped</label>
        </div>
        <label className='input-label' htmlFor='reaction'>Reaction</label>
            <input className='form-input' type='text' name='reaction' value={itemProfile.reaction}
                  label='reaction' onChange={handleChange} />
      </div>
      <div className='button-div'>
        <button className='close-button' onClick={handleCloseModal}>Close</button>
        <button className='submit-button' onClick={handleSubmit}
                disabled={recipientId === emptyGuid}>Submit</button>
      </div>
    </div>


  );

}


GiveItemForm.propTypes = {
  user: PropTypes.any,
  item: PropTypes.object,
  occasionId: PropTypes.string,
  setGivingList: PropTypes.func,
  closeModal: PropTypes.func,
};

export default GiveItemForm;

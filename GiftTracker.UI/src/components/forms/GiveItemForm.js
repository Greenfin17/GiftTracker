import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { getExchangePartnersByUserId } from '../../helpers/data/exchangePartnerData';
import { getWishListItem, getPartnerWishListItems } from '../../helpers/data/wishListData';
import {
  addGiveItem,
  updateGiveItem
} from '../../helpers/data/givingData';
/*
const clearFields = (setFunction) => {
  setFunction((prevState) => ({
    ...prevState,
    itemName: '',
    itemDescription: '',
    merchantItemURL: '',
    price: 0,
  }));
};
*/

const GiveItemForm = ({
  user,
  item,
  occasionId,
  partnerId,
  setGivingList,
  getGiftsMethod,
  showModal,
  closeModal,
}) => {

  const emptyGuid = '00000000-0000-0000-0000-000000000000';
  const [recipientId, setRecipientId] = useState(emptyGuid);
  const [recipientOptions, setRecipientOptions] = useState({});
  const wishItemSelectRef = useRef();
  const recipientSelectRef = useRef();
  const [defaultRecipient, setDefaultRecipient] = useState(false);
  const [wishListOptions, setWishListOptions] = useState();
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
  const [wishSelectProfile, setWishSelectProfile] = useState({
    value: emptyGuid,
    label: 'Surprise'
  });

  const [recipientSelectProfile, setRecipientSelectProfile] = useState(false);



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

  // setup select for exchange partners
  useEffect(() => {
    let mounted = true;
    let optionsArr = [];
    if (user) {
    wishItemSelectRef.current.clearValue();
    recipientSelectRef.current.clearValue();
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
  }, [user, showModal]);

  // setup default exchange partner
  useEffect(() => {
    let mounted = true;
    if (item && item.recipientId !== '' && item.recipientId !== emptyGuid && mounted) {
      setItemProfile((prevState) => ({
        ...prevState,
        recipientId: item.recipientId
      }));
      // parallel state hook for select control
      setRecipientSelectProfile((prevState) =>({
        ...prevState,
        recipientId: { value: item.recipientId, label: `${item.recipientFirstName} ${item.recipientLastName}`}
      }))
    }
    else {
      setRecipientSelectProfile(false);
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [item, showModal])
  
  // setup select for wish list items
  useEffect(() => {
    let mounted = true;
    let optionsArr = [];
    wishItemSelectRef.current.clearValue();
    if (recipientId !== emptyGuid && occasionId !== emptyGuid) {
    getPartnerWishListItems(recipientId, occasionId).then((resultArr) => {
        let option = {
          value: emptyGuid,
          label: 'Surpise gift'
        };
      optionsArr.push(option);
      for ( let i = 0; i < resultArr.length; i += 1){
        option = {
          value: resultArr[i].id,
          label: `${resultArr[i].name}`
        };
        optionsArr.push(option);
      }
        if (mounted) setWishListOptions(optionsArr);
      });
    }
    return () => {
      mounted = false;
      return false;
    }
  }, [recipientId, occasionId, showModal]);
  
  // setup default wish list item in the select
  useEffect(() => {
    let mounted = true;
    if (item && item.id !== '' && item.itemName !== '' 
        && item.wishListItemId && item.wishListItemId !== emptyGuid && mounted) {
      setWishSelectProfile({
        wishListItemId: { value: item.wishListItemId, label: `${item.itemName}`}
      });
    } else if (item.id !== '' && item.Name !== '' && item.wishListItemId === emptyGuid) {
      setWishSelectProfile({
        wishListItemId: { value: emptyGuid, label: `Surprise`}
      });
    } else setWishSelectProfile(false);
    return () => {
      mounted = false;
      return mounted;
    }
  }, [recipientId, item]);

  // setup recipientId, needed for wish list select  
  useEffect(() => {
    let mounted = true;
    if (mounted){
      setRecipientId(partnerId);
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [partnerId]);

  const handleSelectClick = (e) => {
    // ref.current.clearValue clears e to null
    if (e !== null){
      setItemProfile((prevState) => ({
        ...prevState,
        recipientId: e.value
      }));
      setRecipientSelectProfile((prevState) => ({
        ...prevState,
        recipientId: { value: e.value, label: e.label }
      }));
      // setup new options for wish list select
      setRecipientId(e.value);
    }
  };
  
  const handleSelectWishItemClick = (e) => {
    // testing for null as this is triggered on load
    if (e !== null) {
      setItemProfile((prevState) => ({
        ...prevState,
        wishListItemId: e.value
      }));
      // control of the select resides with wishSelectProfile state hook
      setWishSelectProfile((prevState) => ({
        wishListItemId: { value: e.value, label: e.label}
      }))
      // populate form fields if we select a wish list item.
      if (e.value !== emptyGuid) {
        getWishListItem(e.value).then((itemObj) => {
          setItemProfile((prevState) => ({
            ...prevState,
          itemName: itemObj.name,
          itemDescription: itemObj.description,
          merchantItemURL: itemObj.itemURL
          }));
        });
      }
    }
  };
  
  const handleChange = (e) => {
    setItemProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value ? e.target.value: ''
    }));
  };

  const handleSubmit = () => {
    // no item so this is a new gift
    if (!item.id) {
      addGiveItem(itemProfile).then((result) => {
        if (result) {
          getGiftsMethod(occasionId, partnerId)
          // getGiveItemsByOccasionId(occasionId)
          .then((itemsArr) => {
            debugger;
           setGivingList(itemsArr);
          });
        }
      });
    } else {
      updateGiveItem(item.id, itemProfile).then((result) => {
        if (result) {
          getGiftsMethod(occasionId, recipientId)
          .then((itemsArr) => setGivingList(itemsArr));
        }
      });
    }
    closeModal();
    setRecipientSelectProfile(false);
  };

  const handleCloseModal = () => {
    if (item.id === undefined) {
      setDefaultRecipient({
        value: null,
        label: 'Select a recipient...'
      });
    }
    closeModal();
  };

  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Gift Item Form
        <span className='x-out' onClick={closeModal}>x</span>
      </div>
      <div className='form-recipient-select' key={defaultRecipient.value} >
          <Select ref={recipientSelectRef} options={recipientOptions} onChange={handleSelectClick}
            placeholder='Select a recipient...'
            name='recipientId'
            value={recipientSelectProfile.recipientId} />
      </div>
      <div className='form-wish-item-select' key={'wish_list_' + recipientId} >
          <Select ref={wishItemSelectRef}  options={wishListOptions} onChange={handleSelectWishItemClick}
            placeholder='Select a wish list item, (optional )...'
            name='wishListItemId'
            value={wishSelectProfile.wishListItemId} />
      </div>
      <div className='form-group'>
        <label className='input-label' htmlFor='itemName'>Gift Name</label>
            <input className='form-input' type='text' name='itemName' value={itemProfile.itemName}
                  label='itemName' onChange={handleChange} />
        <label className='input-label' htmlFor='itemDescription'>Gift Description</label>
            <input className='form-input' type='text' name='itemDescription' value={itemProfile.itemDescription}
                  label='itemDescription' onChange={handleChange} />
        <label className='input-label' htmlFor='merchantItemURL'>Merchant URL</label>
            <input className='form-input' type='text' name='merchantItemURL' value={itemProfile.merchantItemURL}
                  label='merchantURL' onChange={handleChange} />
        <label className='input-label' htmlFor='price'>Price</label>
            <input className='form-input' type='number' step='.01' name='price' value={itemProfile.price}
                  label='price' onChange={handleChange} />
        <div className='inline-checkbox'>
          <input className='form-input inline-checkbox-input' type='checkbox' name='purchased' value={itemProfile.purchased}
                   checked={itemProfile.purchased} label='purchased' onChange={handleChange} />
          <label className='input-label inline-checkbox-label' htmlFor='purchased'>Purchased</label>
        </div>
        <div className='inline-checkbox'>
          <input className='form-input inline-checkbox-input' type='checkbox' name='wrapped' value={itemProfile.wrapped}
                  checked={itemProfile.wrapped} label='wrapped' onChange={handleChange} />
          <label className='input-label inline-checkbox-label' htmlFor='wrapped'>Wrapped</label>
        </div>
        <div className='inline-checkbox'>
          <input className='form-input inline-checkbox-input' type='checkbox' name='shipped' value={itemProfile.shipped}
                    checked={itemProfile.shipped} label='shipped' onChange={handleChange} />
          <label className='input-label inline-checkbox-label' htmlFor='shipped'>Shipped</label>
        </div>
        <label className='input-label' htmlFor='reaction'>Reaction</label>
            <input className='form-input' type='text' name='reaction' value={itemProfile.reaction}
                  label='reaction' onChange={handleChange} />
      </div>
      <div className='button-div'>
        <button className='close-button' onClick={handleCloseModal}>Close</button>
        <button className='submit-button' onClick={handleSubmit}
                disabled={itemProfile.recipientId === emptyGuid}>Submit</button>
      </div>
    </div>


  );

}


GiveItemForm.propTypes = {
  user: PropTypes.any,
  item: PropTypes.object,
  occasionId: PropTypes.string,
  partnerId: PropTypes.string,
  setGivingList: PropTypes.func,
  getGiftsMethod: PropTypes.func,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default GiveItemForm;

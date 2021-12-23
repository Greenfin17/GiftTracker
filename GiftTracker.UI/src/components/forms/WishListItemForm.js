import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPartnerWishListItems, addWishListItem, updateWishListItem } from '../../helpers/data/wishListData';
const WishListItemForm = ({
  ownerId,
  item,
  occasionId,
  setWishListItems,
  closeModal
}) => {
  const emptyGuid = '00000000-0000-0000-0000-000000000000';
  
  const [itemProfile, setItemProfile] = useState({
    occasionId: occasionId || emptyGuid,
    ownerId: ownerId || emptyGuid, 
    name: item.name || '',
    description: item.description || '',
    itemURL: item.itemURL || '',
  });
  
  useEffect(() => {
    let mounted = true;
    if (item && mounted) {
      setItemProfile ({
        occasionId: occasionId || emptyGuid,
        ownerId: ownerId || emptyGuid, 
        name: item.name || '',
        description: item.description || '',
        itemURL: item.itemURL || '',
      });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [occasionId, item ]);

  const handleChange = (e) => {
    setItemProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value ? e.target.value: ''
    }));
  };

  const handleSubmit = () => {
    console.warn('submit wishlistItem');
    // no item so this is a new gift
    if (!item.id) {
      addWishListItem(itemProfile).then((result) => {
        if (result) {
          getPartnerWishListItems(ownerId, occasionId)
            .then((itemList) => setWishListItems(itemList));
        }
      });
    } else {
      updateWishListItem(item.id, itemProfile).then((result) => {
        if (result) {
          getPartnerWishListItems(ownerId, occasionId)
            .then((itemList) => setWishListItems(itemList));
        }
      });
    }
    closeModal();
  };
  
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Receive Item Form
        <span className='x-out' onClick={closeModal}>x</span>
      </div>
      <div className='form-group'>
        <label className='input-label' htmlFor='name'>Item Name</label>
            <input className='form-input' type='text' name='name' value={itemProfile.name}
                  label='name' onChange={handleChange} />
        <label className='input-label' htmlFor='description'>Item Description</label>
            <input className='form-input' type='text' name='description' value={itemProfile.description}
                  label='description' onChange={handleChange} />
        <label className='input-label' htmlFor='itemURL'>Gift URL link</label>
            <input className='form-input' type='text' name='itemURL' value={itemProfile.itemURL}
                  label='itemURL' onChange={handleChange} />
      </div>
      <div className='button-div'>
        <button className='close-button' onClick={handleCloseModal}>Close</button>
        <button className='submit-button' onClick={handleSubmit}
                disabled={itemProfile.giverId === emptyGuid}>Submit</button>
      </div>
    </div>
  );

}

WishListItemForm.propTypes = {
  ownerId: PropTypes.string,
  item: PropTypes.object,
  occasionId: PropTypes.string,
  setReceivingList: PropTypes.func,
  closeModal: PropTypes.func
};

export default WishListItemForm;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
import WishListItemForm from '../components/forms/WishListItemForm';
import { getOccasionsByUserId } from '../helpers/data/occasionData';
import { getPartnerWishListItems } from '../helpers/data/wishListData';
import { getExchangePartnerByPartnerId } from '../helpers/data/exchangePartnerData';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
/*
import {
  GTModal,
  GTModalContent
} from '../components/ModalElements';
*/

const UserLists = ({
  user,
}) => {
  const emptyGuid = '00000000-0000-0000-0000-000000000000';
  const { partnerId, defaultOccasionId } = useParams();
  const [occasionOptions, setOccasionOptions] = useState([]);
  const [occasionId, setOccasionId] = useState(defaultOccasionId);
  const [wishListItems, setWishListItems] = useState([]);
  const [defaultOccasionOption, setDefaultOccasionOption] = useState({
    value: null, label: 'Select an occasion...'
  });
  const [partner, setPartner] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeObject, setActiveObject] = useState({
    id: '',
    occasionId: '',
    ownerId: partnerId || emptyGuid, 
    name: '',
    description: '',
    itemURL: '',
  });


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
        if (defaultOccasionId && mounted) {
          setDefaultOccasionOption(optionsArr.filter(item => item.value === defaultOccasionId));
        }

        if (mounted) setOccasionOptions(optionsArr);
      });
      setOccasionId(defaultOccasionId);
    }
    return () => {
      mounted = false;
      return mounted;
    };
  }, [user, defaultOccasionId]);

  useEffect(() => {
    let mounted = true;
    if (partnerId) {
      getExchangePartnerByPartnerId(partnerId).then((partner) => {
        if (mounted) setPartner(partner);
      });
    }
    return () => {
      mounted = false;
      return mounted;
    }
  }, [partnerId])
  
  useEffect(() => {
    let mounted = true;
    if (user && partnerId && occasionId) {
      setWishListItems([]);
      getPartnerWishListItems(partnerId, occasionId).then((itemList) => {
        if (mounted && itemList?.length > 0) {
          setWishListItems(itemList);
        }
        else setWishListItems([]);
      })
      .catch(() => setWishListItems([]));
    }
    return () => {
      mounted = false;
      return mounted;
    };
  }, [user, partnerId, occasionId]);
            
  
  const handleSelectClick = (e) => {
    setOccasionId(e.value);
  };

  const handleItemClick = (item) => {
    setActiveObject(item)
  };

  const handleAddItemClick = () => {
    console.warn('add item');
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='lists-view'>
      <div className='page-title'>
         Lists for {partner.firstName} {partner.lastName}
      </div>
      { user && <><div className='lists-div'>
        <div className='form-recipient-select' key={defaultOccasionOption.value}>
            <Select options={occasionOptions} onChange={handleSelectClick}
              placeholder='Select an occasion...'
              defaultValue={defaultOccasionOption} />
        </div>
        <div className='wish-list-div'>
          <ul className='wish-item-list'>
            { wishListItems.length  ? wishListItems?.map((item) => <li key={item.id}
                className='wish-list-line' onClick={() => handleItemClick(item)} >
                <div>{item.name}</div>
                <div>{item.description}</div>
                <div>{item.itemURL}</div>
              </li>) :  occasionId && <div>Nothing on this list</div> }
          </ul>
        </div>
        { occasionId &&
        <div className='button-div'>
          <button className='add-give-item-btn' onClick ={handleAddItemClick}>Add Wishlist Item</button>
        </div> }
          <GTModal className='gt-modal' isOpen={showModal}>
            <GTModalContent className='modal-content'>
              <WishListItemForm ownerId={partnerId} item={activeObject} occasionId={occasionId}
                setWishListItems={setWishListItems} closeModal={closeModal} />
            </GTModalContent>
          </GTModal>
      </div>
      </>
      }
    </div>
  );
};

UserLists.propTypes = {
  user: PropTypes.any,
  defaultOccasionId: PropTypes.string
};

export default UserLists;

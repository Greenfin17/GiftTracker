import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { deleteExchangePartner, partnerHasData } from '../../helpers/data/exchangePartnerData';
import { deleteInterestsByPartnerId } from '../../helpers/data/interestData';


const ConfirmDeleteForm = ({
  user,
  partnerId,
  getPartnersMethod,
  getPartnersMethodArguments,
  setExchangePartners,
  closeModal
  }) => {
    const [hasData, setHasData] = useState(true);

    useEffect(() => {
      let mounted = true;
      if (user && partnerId){
        partnerHasData(partnerId).then((response) => {
          if (mounted) {
            console.warn(response);
            setHasData(response);
          }
        });
      }
      return () => {
        mounted = false;
        return mounted;
      }
    }, [user, partnerId]);

    const handleConfirmDelete = () => {
      if (partnerId && partnerId !== ''){
        deleteInterestsByPartnerId(partnerId).then(() => {
        deleteExchangePartner(partnerId).then((wasDeleted) => {
          if (wasDeleted) {
            debugger;
            getPartnersMethod(...getPartnersMethodArguments)
              .then((partnerList) => setExchangePartners(partnerList));
            }
        })});
      }
      console.warn('confirm-delete');
    /*
      deleteInterestsByPartnerId(partner.id).then(() => {
      deleteExchangePartner(partner.id).then((wasDeleted) => {
        if (wasDeleted) {
          getExchangePartnersByUserId(user.id).then((partnerList) => setExchangePartners(partnerList));
        }
      });
    });
    */
      closeModal();
    };

    const handleCancelDelete= () => {
      console.warn('cancel-delete');
      closeModal();
    };

  
  return (
    <div className='form-outer-div'>
      <div className='form-heading'>Confirm Delete
        <span className='x-out' onClick={closeModal}>x</span>
      </div>
      <div className='confirm-form'>
        { hasData ? <div className='confirm-message'>
          <p>This gift exchange partner has data associated with it.</p>
          <p>To delete this exchange partner, please delete all associated
             gifts and wishlists.
          </p>
          </div>
          : <div className='confirm-message'><p>Are you sure you want to delete this gift exchange partner?</p>
            <button className='confirm-delete' onClick={handleConfirmDelete}>
              Yes, delete
            </button>
            <button className='cancel-delete' onClick={handleCancelDelete}>
              Cancel
            </button>
        </div>}
      </div>
    </div>
  );
};

ConfirmDeleteForm.propTypes = {
  user: PropTypes.any,
  partnerId: PropTypes.string,
  getPartnersMethod: PropTypes.func,
  getPartnersMethodArguments: PropTypes.array,
  setExchangePartners: PropTypes.func,
  closeModal: PropTypes.func
};

export default ConfirmDeleteForm;

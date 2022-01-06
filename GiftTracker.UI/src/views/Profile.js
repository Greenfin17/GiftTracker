import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../components/symbols/Avatar';
import ProfileForm from '../components/forms/ProfileForm';
import {
 GTModal,
 GTModalContent
 } from '../components/ModalElements';

const Profile = ({
  user,
  setUser
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      {user &&
        <div className = 'gt-profile-view'>
          <div className='profile-title'>Profile for {user.firstName} {user.LastName}</div>
          <div className='profile-inner-div'>
            <div className='profile-pic-div'>
              <Avatar imageURL={user.profilePicUrl} firstName={user.firstName}
                      width={120} height={120} />
            </div>
            <div className='profile-info-div'>
              <div className='profile-info-line'>
                <div className='profile-label'>Name:</div>
                <div className='profile-data'>{user.firstName} {user.lastName}</div>
              </div>
              <div className='profile-info-line'>
                <div className='profile-label'>Email:</div>
                <div className='profile-data'>{user.emailAddress}</div>
              </div>
              <div className='profile-info-line'>
                <div className='profile-label'>Profile Photo URL:</div>
                <div className='profile-photo-url-data'>{user.profilePicUrl}</div>
              </div>
              <div className='button-div'>
                <button className='profile-edit-button'
                  onClick={toggleModal}>edit</button>
              </div>
              <GTModal className='gt-modal' isOpen={modalIsOpen} toggle={toggleModal}>
                <GTModalContent className='modal-content'>
                  <ProfileForm user={user} setUser={setUser}
                    closeModal={closeModal} />
                </GTModalContent>
              </GTModal>
            </div>  { /* profile-info-div */ }
          </div>
        </div>
      }
    </>
  );
};

Profile.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default Profile;

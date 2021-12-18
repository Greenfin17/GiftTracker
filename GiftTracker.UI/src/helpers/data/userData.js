import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getUserById = (userId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/users/${userId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
const getUserByFirebaseUId = (uid) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/users/uid/${uid}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addUser = (userObj) => new Promise((resolve, reject) => {
  axios.post(`${apiURL}/api/users`, userObj)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateUser = (userId, userObj) => new Promise((resolve, reject) => {
  axios.put(`${apiURL}/api/users/${userId}`, userObj)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addUserWithGoogleObject = (googleObject) => new Promise((resolve, reject) => {
  if (googleObject) {
    const userInfo = {
      firstName: googleObject.displayName.split(' ')[0],
      lastName: googleObject.displayName.split(' ')[1],
      fireBaseUID: googleObject.uid,
      emailAddress: googleObject.email,
      profilePicURL: googleObject.photoURL
    };
    addUser(userInfo)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  }
});


export {
  getUserById,
  getUserByFirebaseUId,
  addUser,
  updateUser,
  addUserWithGoogleObject
};

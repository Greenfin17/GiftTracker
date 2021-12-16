import axios from 'axios';
import { debugErrorMap } from 'firebase/auth';
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
    .then((response) => {
      debugger;
      resolve(response.data);
    })
    .catch((error) => {
      debugger;
      console.warn(error);
      reject(error)
    });
});

const addUserWithGoogleObject = (googleObject) => {
  console.warn(googleObject);
  if (googleObject) {
    const userInfo = {
      FirstName: googleObject.displayName.split(' ')[0],
      LastName: googleObject.displayName.split(' ')[1],
      FireBaseUID: googleObject.uid,
      EmailAddress: googleObject.email,
      ProfilePicURL: googleObject.photoURL
    };
    addUser(userInfo);
  }
}

export {
  getUserById,
  getUserByFirebaseUId,
  addUser,
  addUserWithGoogleObject
};

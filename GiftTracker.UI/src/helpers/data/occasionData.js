import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getOccasionById = (occasionId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/users/occasions/${occasionId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getOccasionsByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/users/${userId}/occasions`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateOccasion = (occasionId, occasionObj) => new Promise((resolve, reject) => {
  axios.put(`${apiURL}/api/users/occasions/${occasionId}`, occasionObj)
    .then((wasUpdated) => resolve(wasUpdated))
    .catch((error) => reject(error));
});

const addOccasion = (occasionObj) => new Promise((resolve, reject) => {
  axios.post(`${apiURL}/api/users/occasions`, occasionObj)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteOccasion = (occasionId) => new Promise((resolve, reject) => {
  axios.delete(`${apiURL}/api/users/occasions/${occasionId}`)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getOccasionById,
  getOccasionsByUserId,
  updateOccasion,
  addOccasion,
  deleteOccasion
};

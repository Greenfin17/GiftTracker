import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getGiveItemsByOccasionId = (occasionId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/users/giveItems/details/occasions/${occasionId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addGiveItem = (itemObj) => new Promise((resolve, reject) => {
  axios.post(`${apiURL}/api/users/giveItems`, itemObj)
    .then((response) => resolve(response.data))
    .catch((error) => {
      console.log(error);
      reject(error);
    });
});

const updateGiveItem = (itemId, itemObj) => new Promise((resolve, reject) => {
  axios.put(`${apiURL}/api/users/giveItems/${itemId}`, itemObj)
    .then((wasUpdated) => resolve(wasUpdated))
    .catch((error) => reject(error));
});

const deleteGiveItem = (itemId) => new Promise((resolve, reject) => {
  axios.delete(`${apiURL}/api/users/giveItems/${itemId}`)
    .then((wasDeleted) => resolve(wasDeleted))
    .catch((error) => reject(error));
});

export {
  getGiveItemsByOccasionId,
  addGiveItem,
  updateGiveItem,
  deleteGiveItem
};

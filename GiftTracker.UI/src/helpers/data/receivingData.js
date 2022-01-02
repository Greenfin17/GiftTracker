
import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getReceiveItemById = (itemId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/users/receiveItems/receiveItemWithDetail/${itemId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getReceiveItemsByOccasionId = (occasionId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/users/receiveItemsWithDetail/occasions/${occasionId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addReceiveItem = (itemObj) => new Promise((resolve, reject) => {
  axios.post(`${apiURL}/api/users/receiveItems`, itemObj)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateReceiveItem = (itemId, itemObj) => new Promise((resolve, reject) => {
  axios.put(`${apiURL}/api/users/receiveItems/${itemId}`, itemObj)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteReceiveItem = (itemId) => new Promise((resolve, reject) => {
  axios.delete(`${apiURL}/api/users/receiveItems/${itemId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getReceiveItemById,
  getReceiveItemsByOccasionId,
  addReceiveItem,
  updateReceiveItem,
  deleteReceiveItem
};

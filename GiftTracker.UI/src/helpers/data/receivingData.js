
import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getReceiveItemsByOccasionId = (occasionId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/users/receiveItemsWithDetail/occasions/${occasionId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteReceiveItem = (itemId) => new Promise((resolve, reject) => {
  axios.delete(`${apiURL}/users/receiveItems/${itemId}`)
    .then((wasDeleted) => resolve(wasDeleted))
    .catch((error) => reject(error));
});

export {
  getReceiveItemsByOccasionId,
  deleteReceiveItem
};

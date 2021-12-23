import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getPartnerWishListItems = (partnerId, occasionId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/exchangePartners/${partnerId}/occasions/${occasionId}/wishListItems`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addWishListItem = (itemObj) => new Promise((resolve, reject) => {
  axios.post(`${apiURL}/api/exchangePartners/wishListItems`, itemObj)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateWishListItem = (itemId, itemObj) => new Promise((resolve, reject) => {
  axios.put(`${apiURL}/api/exchangePartners/wishListItems/${itemId}`, itemObj)
    .then((wasUpdated) => resolve(wasUpdated))
    .catch((error) => reject(error));
});

const deleteWishListItem = (itemId) => new Promise((resolve, reject) => {
  axios.delete(`${apiURL}/api/exchangePartners/wishListItems/${itemId}`)
    .then((wasDeleted) => resolve(wasDeleted))
    .catch((error) => reject(error));
});

export{
  getPartnerWishListItems,
  addWishListItem,
  updateWishListItem,
  deleteWishListItem
};

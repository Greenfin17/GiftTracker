import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getPartnerWishListItems = (partnerId, occasionId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/exchangePartners/${partnerId}/occasions/${occasionId}/wishListItems`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getWishListItem = (itemId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/exchangePartners/wishListItems/${itemId}`)
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
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteWishListItem = (itemId) => new Promise((resolve, reject) => {
  axios.delete(`${apiURL}/api/exchangePartners/wishListItems/${itemId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export{
  getPartnerWishListItems,
  getWishListItem,
  addWishListItem,
  updateWishListItem,
  deleteWishListItem
};

import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getExchangePartnersByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/users/${userId}/exchangePartners`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getExchangePartnerByPartnerId = (partnerId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/exchangePartners/${partnerId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});


const addExchangePartner = (partnerObj) => new Promise((resolve, reject) => {
  axios.post(`${apiURL}/api/exchangePartners`, partnerObj)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateExchangePartner = (partnerId, partnerObj) => new Promise((resolve, reject) => {
  axios.put(`${apiURL}/api/exchangePartners/${partnerId}`, partnerObj)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteExchangePartner = (partnerId) => new Promise((resolve, reject) => {
  axios.delete(`${apiURL}/api/exchangePartners/${partnerId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const partnerHasData = (partnerId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/exchangePartners/${partnerId}/hasData`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getExchangePartnersByUserId,
  getExchangePartnerByPartnerId,
  addExchangePartner,
  updateExchangePartner,
  deleteExchangePartner,
  partnerHasData
};

import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getPartnerInterests = (partnerId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/exchangePartners/${partnerId}/interests`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addInterest = (interestObj) => new Promise((resolve, reject) => {
  axios.post(`${apiURL}/api/exchangePartners/interests`, interestObj)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateInterest = (interestId, interestObj) => new Promise((resolve, reject) => {
  axios.put(`${apiURL}/api/exchangePartners/interests/${interestId}`, interestObj)
    .then((wasUpdated) => resolve(wasUpdated))
    .catch((error) => reject(error));
});

const deleteInterest = (interestId) => new Promise((resolve, reject) => {
  axios.delete(`${apiURL}/api/exchangePartners/interests/${interestId}`)
    .then((wasDeleted) => resolve(wasDeleted))
    .catch((error) => reject(error));
});

const deleteInterestsByPartnerId = (partnerId) => new Promise((resolve, reject) => {
  axios.delete(`${apiURL}/api/exchangePartners/${partnerId}/interests`)
    .then((response) =>  resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getPartnerInterests,
  addInterest,
  updateInterest,
  deleteInterest,
  deleteInterestsByPartnerId,
};

import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getExchangePartners = () => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/exchangePartners`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addExchangePartner = (partnerObj) => new Promise((resolve, reject) => {
  axios.post(`${apiURL}/api/exchangePartners`, partnerObj)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
})

export {
  getExchangePartners,
  addExchangePartner
};

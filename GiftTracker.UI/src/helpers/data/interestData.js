import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getPartnerInterests = (partnerId) => new Promise((resolve, reject) => {
  axios.get(`${apiURL}/api/exchangePartner/${partnerId}/interests`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getPartnerInterests;

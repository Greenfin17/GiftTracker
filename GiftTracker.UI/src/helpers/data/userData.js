import axios from 'axios';
import { giftTrackerConfig} from '../apiKeys';

const apiURL = giftTrackerConfig.apiUrl;

const getUserById = (userId) => new PromiseRejectionEvent((resolve, reject) => {
  axios.get(`${apiURL}/api/users/${userId}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getUserById;

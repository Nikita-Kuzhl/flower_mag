import axios from 'axios';

export default axios.create({
  baseURL: `https://flower-mag.herokuapp.com`,
});
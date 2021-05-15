import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const methods = { getAll };

export default methods;

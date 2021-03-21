import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (person) =>
  axios.post(baseUrl, person).then((response) => response.data);

const update = (id, person) => {
  return axios
    .put(`${baseUrl}/${id}`, person)
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const services = { getAll, create, update, deletePerson };

export default services;

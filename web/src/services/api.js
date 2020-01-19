import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gocostura.herokuapp.com',
});

api.interceptors.request.use('Accept: application/vnd.heroku+json; version=3');

export default api;

import { TOKEN_NAME } from '@environments';
import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' });

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(TOKEN_NAME)).token}`;
//     }
  
//     return req;
//   });


export const fetchData = (id) => API.get(`/data/${id}`);
export const getChartData = (id) => API.get(`/data/chart/${id}`);
export const getAllDeviceData = (id) => API.get(`/data/all/${id}`);

export const signIn = (form) => API.post('/user/signin', form);
export const addUser = (form) => API.post('/user/admin/adduser', form);
export const updateProfile = (id, form) => API.post(`/user/updateprofile/${id}`, form);
export const addDevice = (form) => API.post('/device', form);
export const addDeviceSet = (form) => API.post('/set', form);
export const getAdminDevice = (form) => API.post('/device/admin/all', form);
export const getCountDevice = () => API.get('/device/admin/count');
export const updateDevice = (form) => API.post('/device/admin/update', form);
export const deleteDevice = (id) => API.delete(`/device/admin/delete/${id}`);
export const getAdminDeviceSet = (form) => API.post('/set/admin/all', form);
export const getCountDeviceSet = () => API.get('/set/admin/countDeviceSet');
export const deleteDeviceSet = (id) => API.delete(`/set/admin/delete/${id}`);
export const updateDeviceSet = (form) => API.post('/set/admin/updateDeviceSet', form);
export const getAdminUser = (form) => API.post('/user/admin/all', form);
export const getCountAllUser = () => API.get('/user/admin/countAllUser');
export const deleteUser = (id) => API.delete(`/user/admin/delete/${id}`);
export const updateUser = (form) => API.post('/user/admin/update', form);
export const getNameSet = () => API.get('/set/admin/getNameSet');
export const getTrafficlightName = () => API.get('/device/admin/TrafficlightName');
export const getDHT11Name = () => API.get('/device/admin/DHT11Name');
export const getLightName = () => API.get('/device/admin/LightName');
export const getUserName = () => API.get('/user/admin/username');
export const getCountUnusedSet = () => API.get('/set/admin/countUnusedSet');
export const countSubscriber = () => API.get('/user/admin/countSubscriber');
getUserName



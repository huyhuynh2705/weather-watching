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
export const getAllDeviceData = (id) => API.get(`/data/all/${id}`);

export const signIn = (form) => API.post('/user/signin', form);
export const signUp = (form) => API.post('/user/signup', form);
export const updateProfile = (id, form) => API.post(`/user/updateprofile/${id}`, form);
export const addDevice = (form) => API.post('/device', form);
export const addDeviceSet = (form) => API.post('/set', form);
export const getAdminDevice = (form) => API.post('/device/admin/all', form);
export const getCountDevice = () => API.get('/device/admin/count');
export const updateDevice = (form) => API.post('/device/admin/update', form);
export const deleteDevice = (id) => API.delete(`/device/admin/delete/${id}`);
export const getAdminDeviceSet = (form) => API.post('/set/admin/all', form);
export const getCountDeviceSet = () => API.get('/set/admin/count');
export const deleteDeviceSet = (id) => API.delete(`/set/admin/delete/${id}`);
export const getAdminUser = (form) => API.post('/user/admin/all', form);
export const getCountUser = () => API.get('/user/admin/count');
export const deleteUser = (id) => API.delete(`/user/admin/delete/${id}`);
export const updateUser = (form) => API.post('/user/admin/update', form);



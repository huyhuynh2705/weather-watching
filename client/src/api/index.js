import { TOKEN_NAME } from '@environments';
import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' });

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(TOKEN_NAME)).token}`;
//     }
  
//     return req;
//   });

// // export const signin = (username, password) => axios.post(`${url}/${'signin'}`, { username, password })
// export const signIn = (form) => API.post('/user/signin', form);

export const fetchData = () => API.get('/data');
export const signIn = (form) => API.post('/user/signin', form);


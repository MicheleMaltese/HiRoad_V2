import axios from 'axios';

const api = axios.create({
    baseUrl: "http://10.0.0.218:3000/api",
});

export const insertUser = payload => api.post('/user', payload);
export const updateUser =  payload => api.put('/user/:email', payload);
const apis = {
    insertUser,
    updateUser
};

export default apis;
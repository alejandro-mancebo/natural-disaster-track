import axios from 'axios';


const URL = 'http://localhost:5000';
//const URL = 'https://ittaylor-api-ndt.onrender.com:5000';

export const axiosPublic = axios.create({
  baseURL: URL
});


export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});


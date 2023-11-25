import axios from 'axios';

const URL = import.meta.env.BASE_URL
  ? import.meta.env.BASE_URL
  : 'http://localhost:5000'

export const axiosPublic = axios.create({
  baseURL: URL
});


export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});


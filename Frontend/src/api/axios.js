import axios from "axios"

export const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true


})

export const getImageUrl = (path) => {
  if (!path) return '/placeholder.png';
  return `http://localhost:5000${path}`;
}
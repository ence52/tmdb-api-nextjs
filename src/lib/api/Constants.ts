import axios from "axios";

export const API_URL = "https://api.themoviedb.org/3";

export const API_PHOTO_URL = "https://www.themoviedb.org/t/p/w780";
export const API_ORIGINAL_PHOTO_URL = "https://www.themoviedb.org/t/p/original";

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    "Content-Type": "application/json",
  },
});

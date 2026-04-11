import axios from "axios";


export const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "https://client-flow-api.vercel.app/api/v1",
})
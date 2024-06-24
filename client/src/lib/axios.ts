import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8025",
  headers: {
      "Content-Type": "application/json",
  },
})

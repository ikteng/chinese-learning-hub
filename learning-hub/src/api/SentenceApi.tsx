import axios from "axios";
import { REST_HOSTNAME } from "../Config";

export type Sentence = {
  id?: number;
  text: string;
};

const axiosInstance = axios.create({
  baseURL: REST_HOSTNAME,
});

// Include JWT token if needed
axiosInstance.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers["x-access-token"] = jwt;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const SentenceApi = {
  getAll: async (): Promise<Sentence[]> => {
    const response = await axiosInstance.get("/sentences");
    return response.data;
  },

  add: async (sentence: string): Promise<Sentence> => {
    const response = await axiosInstance.post("/sentences", { sentence });
    return response.data;
  },

  update: async (id: number, text: string): Promise<any> => {
    const response = await axiosInstance.put(`/sentences/${id}`, { text });
    return response.data;
  },

  delete: async (id: number): Promise<any> => {
    const response = await axiosInstance.delete(`/sentences/${id}`);
    return response.data;
  },
};

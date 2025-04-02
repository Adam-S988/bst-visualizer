import axios from "axios";

const API_URL = "http://localhost:8080/api/bst";

export const processNumbers = (numbers) => {
  return axios.post(`${API_URL}/process-numbers`, { numbers });
};

export const getPreviousTrees = () => {
  return axios.get(`${API_URL}/previous-trees`);
};

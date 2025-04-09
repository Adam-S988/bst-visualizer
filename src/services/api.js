import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/bst";

export const processNumbers = async (numbers) => {
  return await axios.post(`${API_BASE_URL}/process-numbers`, { numbers });
};

export const fetchPreviousTrees = async () => {
  return await axios.get(`${API_BASE_URL}/previous-trees`);
};

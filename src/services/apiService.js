import axios from 'axios';

const API_URL = 'http://your-backend-url.com'; // Update with your backend URL

export const saveServerUrl = async (url) => {
  try {
    const response = await axios.post(`${API_URL}/server`, { url });
    return response.data;
  } catch (error) {
    console.error('Error saving server URL:', error);
  }
};

export const saveApiProperties = async (url) => {
  try {
    const response = await axios.post(`${API_URL}/api`, { url });
    return response.data;
  } catch (error) {
    console.error('Error saving API properties:', error);
  }
};

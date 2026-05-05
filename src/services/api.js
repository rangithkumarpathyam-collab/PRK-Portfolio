import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const getProfile = async () => {
  try {
    const res = await axios.get(`${API_URL}/profile`);
    return res.data;
  } catch (err) {
    console.error('Error fetching profile:', err);
    return {
      name: 'Pathyam Ranjith Kumar',
      role: 'B.Tech Data Science Student',
      about: 'I am a B.Tech student in Data Science...',
      skills: { languages: [], frontend: [], backend: [], database: [], other: [] },
      contact: {}
    };
  }
};

export const getProjects = async () => {
  try {
    const res = await axios.get(`${API_URL}/projects`);
    return res.data;
  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
};

export const sendMessage = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/contact`, data);
    return res.data;
  } catch (err) {
    console.error('Error sending message:', err);
    throw err;
  }
};

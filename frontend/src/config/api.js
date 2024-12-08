const API_URL = process.env.REACT_APP_API_URL;

export const fetchConfig = {
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'
};

export const endpoints = {
  articles: `${API_URL}/api/articles`,
  sendCode: `${API_URL}/api/send-code`,
  verifyCode: `${API_URL}/api/verify-code`,
};

export default API_URL; 
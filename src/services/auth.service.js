import axios from "axios";


const API_URL = "https://dummyjson.com/auth";


const login = (username, password) => {
  return fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      // Optional: expiresInMins: 60,
    }),
  })
  .then(response => {
    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Check if the response contains an access token
    console.log("Data",data)
    if (data.token) {
      // Save the access token in local storage for future use
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  })
  .catch(error => {
    console.error('Login error:', error.message);
    throw error; // Rethrow the error to propagate it further if needed
  });
};


const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;

const instance = require("../instance");

async function login(username, password) {
  let response;
  try {
    const url = '/auth/login';
    const body = {
      username,
      password
    };
    response = await instance.post(url, body);
  } catch (e) {
    response = e.response;
  } finally {
    return response;
  }
}

async function getLoggedInUserData(token) {
  let response;
  try {
    const headers = { Authorization: `Bearer ${token}` }
    response = await instance.get('/auth/me', { headers });
  } catch (e) {
    response = e.response;
  } finally {
    return response;
  }
}

const AuthAPI = {
  login,
  getLoggedInUserData
};

module.exports = { AuthAPI }
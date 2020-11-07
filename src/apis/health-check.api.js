const instance = require("../instance");

async function get() {
  let response;
  try {
    response = await instance.get('/health-check');
  } catch (e) {
    response = e.response;
  } finally {
    return response;
  }
}

const HealthCheckAPI = {
  get
};

module.exports = { HealthCheckAPI }
const instance = require('../instance');

async function findAll() {
  let response;
  try {
    response = await instance.get('/currencies');
  } catch (e) {
    response = e.response;
  } finally {
    return response;
  }
}

async function findOne(id) {
  let response;
  try {
    response = await instance.get('/currencies/' + id);
  } catch (e) {
    response = e.response;
  } finally {
    return response;
  }
}

async function create({ name, code, decimalPoint }) {
  let response;
  try {
    response = await instance.post('/currencies', { name, code, decimalPoint });
  } catch (e) {
    response = e.response;
  } finally {
    return response;
  }
}

async function update(id, { name, code, decimalPoint }) {
  let response;
  try {
    response = await instance.patch(
      '/currencies/' + id ,
      { name, code, decimalPoint }
    );
  } catch (e) {
    response = e.response;
  } finally {
    return response;
  }
}
async function remove(id) {
  let response;
  try {
    response = await instance.delete('/currencies' + id);
  } catch (e) {
    response = e.response;
  } finally {
    return response;
  }
}

const CurrenciesAPI = {
  findAll,
  findOne,
  create,
  update,
  remove
}

module.exports = { CurrenciesAPI }
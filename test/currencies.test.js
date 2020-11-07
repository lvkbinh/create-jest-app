const { CurrenciesAPI } = require("../src/apis/currencies.api");

describe('Currencies', function() {
 it ("check status code return 200", async function(done){
  
  const response = await CurrenciesAPI.findOne(3);

  const responseStatusCode = response.status;
      
  expect(responseStatusCode).toEqual(200);

  return done();
 });

 it ("check status code not 200", async function(done){
  
  const response = await CurrenciesAPI.findOne(3);

  const responseStatusCode = response.status;
      
  expect(responseStatusCode).not.toEqual(203);

  return done();
 });
});
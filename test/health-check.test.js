const { describe } = require("@jest/globals");
const { HealthCheckAPI } = require("../src/apis/health-check.api");

describe("Health-check", function() {

  describe("GET /heath-check", function() {

    it("Backend server should return with status code = 200", async function(done) {
      const response = await HealthCheckAPI.get();
      
      const responseStatusCode = response.status;
      
      expect(responseStatusCode).toEqual(200);
      
      return done();
    });

  });

});
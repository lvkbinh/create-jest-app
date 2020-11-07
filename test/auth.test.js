const { expect, describe, it, beforeAll } = require("@jest/globals");
const { AuthAPI } = require("../src/apis/auth.api");

describe("Authentication", function () {
  
  describe("POST /auth/login", function () {

    it("Should throw error when missing username", async function (done) {
      const username = undefined;
      const password = "123456";

      const response = await AuthAPI.login(username, password);

      const statusCode = response.status;

      expect(statusCode).toEqual(401);

      return done();
    });

    it("Should throw error when missing password", async function (done) {
      const username = "guest";
      const password = undefined;
  
      const response = await AuthAPI.login(username, password);
  
      const statusCode = response.status;
  
      expect(statusCode).toEqual(401);
  
      return done();
    });

    it("Should throw error when wrong username", async function (done) {
      const username = "guest";
      const password = "123456";
  
      const response = await AuthAPI.login(username, password);
  
      const statusCode = response.status;
  
      expect(statusCode).toEqual(401);
  
      return done();
    });

    it("Should throw error when wrong password", async function (done) {
      const username = "inputterTDS";
      const password = "654321";
  
      const response = await AuthAPI.login(username, password);
  
      const statusCode = response.status;
  
      expect(statusCode).toEqual(401);
  
      return done();
    });

    it("Should login successfully and return token", async function (done) {
      const username = "inputterTDS";
      const password = "123456";
  
      const response = await AuthAPI.login(username, password);
  
      const statusCode = response.status;
      expect(statusCode).toEqual(201);

      const responseBody = response.data;
      expect(responseBody).toHaveProperty("token");

      const token = responseBody.token;
      expect(typeof token).toBe("string");

      return done();
    });

  });

  describe("GET /auth/me", function () {

    describe("Provide wrong token", function () {

      it ("Should throw error when provided wrong token", async function () {
        const token = "someRandomString";

        const response = await AuthAPI.getLoggedInUserData(token);

        expect(response.status).toEqual(401);
      });

    });

    describe("Provide correct token", function () {
      const username = "inputterTDS";
      const password = "123456";

      let response;
      let user;
  
      // Will run 1 time before run "it" below
      beforeAll(async function () {
        const loggedInResponse = await AuthAPI.login(username, password);

        const token = loggedInResponse.data.token;

        const userDataResponse = await AuthAPI.getLoggedInUserData(token);

        response = userDataResponse;
        user = response.data;

        return;
      });

      it("Should return status code = 200", function (done) {
        expect(response.status).toBe(200);
        return done();
      });

      it("Should return correct username", function (done) {
        expect(user).toHaveProperty("username");
        expect(user.username).toBe(username);
        return done();
      });

      it("Should not return password", function (done) {
        expect(user).not.toHaveProperty("password");
        return done();
      });

      it("Should be an inputter", function (done) {
        expect(user.roleId).toBeDefined();
        expect(user.role.code).toBe("INPUTTER");
        return done();
      });

      it("Should belong to TDS department", function (done) {
        expect(user.department).not.toBeNull();
        expect(user.department.code).toBe("TDS");
        return done();
      });

    });

  });

});
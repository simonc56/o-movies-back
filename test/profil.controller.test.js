import { describe, it } from "mocha";
import { expect } from "chai";
import profilController from "../app/controllers/profilController.js";

describe("profilController", () => {
  describe("getProfil", () => {
    it("should return a success status and data object", async () => {
      const req = { userId: 1 }; // Simulate a request object with a userId
      const res = {
        json: (data) => data, // Simulate a json method that returns the data passed as an argument
      };

      const response = await profilController.getProfil(req, res);

      // Verify that the response is an object with the expected properties
      expect(response).to.be.an("object");
      expect(response).to.have.property("status", "success");
      expect(response).to.have.property("data").that.is.an("object");

      // Verify that the data object has the expected properties
      const { data } = response;
      expect(data).to.have.property("id");
      expect(data).to.have.property("count_review").that.is.a("number");
      expect(data).to.have.property("count_rating").that.is.a("number");
    });
  });
});


import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import { User, Review, Rating } from "../app/models/associations.js";
import profilController from "../app/controllers/profilController.js";

describe("profilController", () => {
  describe("getProfil", () => {
    let res;

    beforeEach(() => {
      res = { json: sinon.spy() };

      sinon.stub(User, "findOne");
      sinon.stub(Review, "count");
      sinon.stub(Rating, "count");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should return a success status and data object", async () => {
      const req = { userId: 1 };

      const fakeUserData = {
        dataValues: {
          id: 1,
          firstname: "John",
          lastname: "Doe",
          email: "john@example.com",
          birthdate: "1990-01-01",
        },
      };

      User.findOne.resolves(fakeUserData);
      Review.count.resolves(5);
      Rating.count.resolves(10);

      await profilController.getProfil(req, res);

      expect(res.json.calledOnce).to.be.true;
      const response = res.json.firstCall.args[0];

      expect(response).to.be.an("object");
      expect(response).to.have.property("status", "success");
      expect(response).to.have.property("data").that.is.an("object");

      const { data } = response;
      expect(data).to.have.property("id", 1);
      expect(data).to.have.property("count_review", 5);
      expect(data).to.have.property("count_rating", 10);
    });
  });
});


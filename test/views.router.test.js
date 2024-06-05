import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import viewsController from "../app/controllers/viewsController.js";
import * as validationMiddlewareModule from "../app/middlewares/validationMiddleware.js";
import * as verifyTokenModule from "../app/middlewares/authMiddleware.js";

describe("views.routes", () => {
  let req, res, next;
  let verifyTokenStub, validationMiddlewareStub;

  beforeEach(() => {
    req = {};
    res = {};
    next = sinon.spy();
    verifyTokenStub = sinon.stub(verifyTokenModule, "default").callsArg(2);
    validationMiddlewareStub = sinon.stub(validationMiddlewareModule, "validationMiddleware").callsArg(2);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("POST /api/view", () => {
    it("should call the correct middlewares and controller", () => {
      const controllerWrapperSpy = sinon.spy(controllerWrapper);
      const createMediaAsViewedSpy = sinon.spy(viewsController, "createMediaAsViewed");

      controllerWrapperSpy(viewsController.createMediaAsViewed)(req, res, next);

      expect(verifyTokenStub.calledBefore(validationMiddlewareStub)).to.be.true;
      expect(validationMiddlewareStub.calledBefore(controllerWrapperSpy)).to.be.true;
      expect(createMediaAsViewedSpy.calledOnce).to.be.true;
      expect(next.notCalled).to.be.true;
    });
  });

  describe("DELETE /api/view/:id", () => {
    it("should call the correct middlewares and controller", () => {
      const controllerWrapperSpy = sinon.spy(controllerWrapper);
      const deleteMediaAsViewedSpy = sinon.spy(viewsController, "deleteMediaAsViewed");

      controllerWrapperSpy(viewsController.deleteMediaAsViewed)(req, res, next);

      expect(verifyTokenStub.calledBefore(validationMiddlewareStub)).to.be.true;
      expect(validationMiddlewareStub.calledBefore(controllerWrapperSpy)).to.be.true;
      expect(deleteMediaAsViewedSpy.calledOnce).to.be.true;
      expect(next.notCalled).to.be.true;
    });
  });
});


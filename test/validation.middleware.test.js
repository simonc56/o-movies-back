import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import validationMiddleware from "../app/middlewares/validationMiddleware.js";
import { z } from "zod";

describe("validationMiddleware", () => {
  let nextSpy;

  beforeEach(() => {
    nextSpy = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });
  it("should call next() when schemas are valid", () => {
    const schemas = {
      body: z.object({
        name: z.string(),
        age: z.number(),
      }),
    };

    const middleware = validationMiddleware(schemas);
    middleware({ body: { name: "John", age: 30 } }, {}, nextSpy);

    expect(nextSpy.calledOnce).to.be.true;
  });
  it("should not call next() and throw an error when schemas are invalid", () => {
    const schemas = {
      body: z.object({
        email: z.string().email(),
      }),
    };

    const middleware = validationMiddleware(schemas);
    const errorSpy = sinon.spy();
    middleware({ body: { email: "invalid-email" } }, {}, errorSpy);

    expect(nextSpy.calledOnce).to.be.false;
    expect(errorSpy.calledOnce).to.be.true;
    expect(errorSpy.firstCall.args[0]).to.be.an.instanceOf(Error);
  });
});
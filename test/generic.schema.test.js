import { describe, it } from "mocha";
import { expect } from "chai";
import { z } from "zod";
import schema from "../app/validation/genericSchemas.js";

describe("Schema Validation", () => {

  describe("paramsId Schema", () => {
      
    it("should validate successfully with a valid id and tmdb_id", () => {
      const validData = {
        id: "1",
        tmdb_id: "123"
      };
        
      expect(() => schema.paramsId.parse(validData)).to.not.throw();
    });
  
    it("should validate successfully with a valid id and optional tmdb_id", () => {
      const validData = {
        id: "1"
      };
        
      expect(() => schema.paramsId.parse(validData)).to.not.throw();
    });
  
    it("should fail validation when id is not a positive integer", () => {
      const invalidData = {
        id: "0",
        tmdb_id: "123"
      };
        
      expect(() => schema.paramsId.parse(invalidData)).to.throw(z.ZodError, /id must be a positive integer/);
    });
  
    it("should fail validation when id is not a number", () => {
      const invalidData = {
        id: "abc",
        tmdb_id: "123"
      };
        
      expect(() => schema.paramsId.parse(invalidData)).to.throw(z.ZodError, /id must be a positive integer/);
    });
  
    it("should fail validation when tmdb_id is not a positive integer", () => {
      const invalidData = {
        id: "1",
        tmdb_id: "0"
      };
        
      expect(() => schema.paramsId.parse(invalidData)).to.throw(z.ZodError, /tmdb_id must be a positive integer/);
    });
  
    it("should fail validation when tmdb_id is not a number", () => {
      const invalidData = {
        id: "1",
        tmdb_id: "abc"
      };
        
      expect(() => schema.paramsId.parse(invalidData)).to.throw(z.ZodError, /tmdb_id must be a positive integer/);
    });
  
  });
  
});
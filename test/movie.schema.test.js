import { describe, it } from "mocha";
import { expect } from "chai";
import schema from "../app/validation/movieSchemas.js";

describe("Movie Schema Validation", () => {

  // getMoviesWithQueries Schema Tests
  describe("getMoviesWithQueries", () => {
    it("should validate a valid getMoviesWithQueries schema", () => {
      const validData = {
        page: "1",
        include_adult: "false",
        sort_by: "popularity.desc"
      };
      expect(() => schema.getMoviesWithQueries.parse(validData)).to.not.throw();
    });
  
    it("should invalidate a negative page number", () => {
      const invalidData = {
        page: "-1"
      };
      expect(() => schema.getMoviesWithQueries.parse(invalidData)).to.throw("page must be a positive integer");
    });
  
    it("should invalidate a non-boolean include_adult value", () => {
      const invalidData = {
        include_adult: "yes"
      };
      expect(() => schema.getMoviesWithQueries.parse(invalidData)).to.throw("include_adult must be true or false");
    });
  
    it("should invalidate an invalid sort_by value", () => {
      const invalidData = {
        sort_by: "invalid.sort"
      };
      expect(() => schema.getMoviesWithQueries.parse(invalidData)).to.throw("sort_by must be one of popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, title.asc, title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc");
    });
  });
  
  // getMovieSearch Schema Tests
  describe("getMovieSearch", () => {
    it("should validate a valid getMovieSearch schema", () => {
      const validData = {
        query: "Inception"
      };
      expect(() => schema.getMovieSearch.parse(validData)).to.not.throw();
    });
  
    it("should invalidate a missing query", () => {
      const invalidData = {};
      expect(() => schema.getMovieSearch.parse(invalidData)).to.throw();
    });
  
    it("should invalidate a too short query", () => {
      const invalidData = {
        query: ""
      };
      expect(() => schema.getMovieSearch.parse(invalidData)).to.throw();
    });
  
    it("should invalidate a too long query", () => {
      const invalidData = {
        query: "a".repeat(51)
      };
      expect(() => schema.getMovieSearch.parse(invalidData)).to.throw();
    });
  });
});
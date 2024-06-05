import { describe, it } from "mocha";
import { expect } from "chai";
import schema from "../app/validation/userSchemas.js";

describe("User Schema Validation", () => {
  
  // Register Schema Tests
  describe("registerSchema", () => {
    it("should validate a valid register schema", () => {
      const validData = {
        email: "test@example.com",
        password: "Password123!",
        firstname: "John",
        lastname: "Doe",
        birthdate: "1990-01-01"
      };
      expect(() => schema.registerSchema.parse(validData)).to.not.throw();
    });

    it("should invalidate an invalid email", () => {
      const invalidData = {
        email: "invalid-email",
        password: "Password123!",
        firstname: "John",
        lastname: "Doe",
        birthdate: "1990-01-01"
      };
      expect(() => schema.registerSchema.parse(invalidData)).to.throw();
    });

    it("should invalidate an invalid password", () => {
      const invalidData = {
        email: "test@example.com",
        password: "invalidpass",
        firstname: "John",
        lastname: "Doe",
        birthdate: "1990-01-01"
      };
      expect(() => schema.registerSchema.parse(invalidData)).to.throw();
    });

    it("should invalidate an invalid firstname", () => {
      const invalidData = {
        email: "test@example.com",
        password: "Password123!",
        firstname: "J",
        lastname: "Doe",
        birthdate: "1990-01-01"
      };
      expect(() => schema.registerSchema.parse(invalidData)).to.throw();
    });

    it("should invalidate an invalid lastname", () => {
      const invalidData = {
        email: "test@example.com",
        password: "Password123!",
        firstname: "John",
        lastname: "D",
        birthdate: "1990-01-01"
      };
      expect(() => schema.registerSchema.parse(invalidData)).to.throw();
    });
  });

  // Sign In Schema Tests
  describe("signInSchema", () => {
    it("should validate a valid sign in schema", () => {
      const validData = {
        email: "test@example.com",
        password: "Password123!"
      };
      expect(() => schema.signInSchema.parse(validData)).to.not.throw();
    });

    it("should invalidate an invalid email", () => {
      const invalidData = {
        email: "invalid-email",
        password: "Password123!"
      };
      expect(() => schema.signInSchema.parse(invalidData)).to.throw();
    });

    it("should invalidate an invalid password", () => {
      const invalidData = {
        email: "test@example.com",
        password: "invalidpass"
      };
      expect(() => schema.signInSchema.parse(invalidData)).to.throw();
    });
  });

  // Change Password Schema Tests
  describe("changePasswordSchema", () => {
    it("should validate a valid change password schema", () => {
      const validData = {
        oldPassword: "OldPassword123!",
        newPassword: "NewPassword123!"
      };
      expect(() => schema.changePasswordSchema.parse(validData)).to.not.throw();
    });

    it("should invalidate an invalid old password", () => {
      const invalidData = {
        oldPassword: "invalidpass",
        newPassword: "NewPassword123!"
      };
      expect(() => schema.changePasswordSchema.parse(invalidData)).to.throw();
    });

    it("should invalidate an invalid new password", () => {
      const invalidData = {
        oldPassword: "OldPassword123!",
        newPassword: "invalidpass"
      };
      expect(() => schema.changePasswordSchema.parse(invalidData)).to.throw();
    });
  });
});

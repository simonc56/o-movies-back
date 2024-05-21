import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

// Define the schema for the user object
const schema = {
  registerSchema : z.object({       
    email: z.string().email(),
    password: z.string().regex(passwordRegex, "Password must be at least 6 characters long and contain at least one uppercase letter and one number"), // Valide le mot de passe
    firstname: z.string().min(2).max(30), 
    lastname: z.string().min(2).max(30),
    birthdate: z.string().min(10).max(10),        
  }).required(),
  signInSchema : z.object({
    email: z.string().email(),
    password: z.string().regex(passwordRegex)// Valide le mot de passe
  }).required(),
};

export default schema;


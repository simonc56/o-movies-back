import { z } from "zod";

// Define the regex for the password
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&,<>^|+_-])(?=.*[a-zA-Z]).{8,}$/;
// Define the schema for the user object
const schema = {
  registerSchema : z.object({       
    email: z.string().email(),
    password: z.string().regex(passwordRegex, "password need to be : Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character: "), // Valide le mot de passe
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


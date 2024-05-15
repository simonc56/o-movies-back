import { User } from "../models/User.js";   // import the User model from the models folder
import bcrypt from "bcrypt"; // import the bcrypt package  
import userSchemas from "../validation/userSchemas.js"; // import the userSchemas file from the validation folder
import validateData from "../validation/validator.js";  // import the validateData file from the validation folder

const authController = {
    async registerUser(req, res) {
        try {
            // get data from request body
            const data = req.body;
            
            const { parsedData, errors } = validateData(data, userSchemas.registerSchema);
            // check if the email format is valid
            if (errors) {
                return res.status(400).json({ error: errors});
            };

            // check if the email already exists 
            const existingUser = await User.findOne({where: {email: parsedData.email},});
        
            if (existingUser) {
                return res.status(400).json({status: 'success', data: "Email already exists"});
            };     

            // hash the password
            const hashedPassword = await bcrypt.hash(parsedData.password, 10);
            
            // create the user
            const user = await User.create({
                role_id: 2,
                firstname: parsedData.firstname,
                lastname: parsedData.lastname,
                email: parsedData.email, 
                password: hashedPassword, 
                birthdate: parsedData.birthdate
            });
            // return the user
            return res.json({ status: "success", data: true });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    }
};

export default authController;


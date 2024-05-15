import {User} from "../models/associations.js"
import validateData from "../validation/validator.js";
import schema from "../validation/userSchemas.js";

const userController = {
    async createUser(req, res) {
        try {
            //get data from request body and validate it 
            const data = req.body;
            // i deconstruct the parsedData and errors from the validateData function
            const { parsedData, errors } = validateData(data, schema.postUser);
            // if there are errors, return them to the client
            if (errors) {
                return res.status(400).json({ data: errors });
            }
            // create the user
            return res.json({ status: 'success', data: `user: ${parsedData.email} created`});
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.errors });
        }
    }    
};
export default userController;

import {User} from "../models/associations.js"
import validateData from "../validation/validator.js";
import schema from "../validation/userSchemas.js";

const userController = {
    async createUser(req, res) {
        try {
            const data = req.body;
            const { parsedData, errors } = validateData(data, schema.postUser);
            if (errors) {
                return res.status(400).json({ data: errors });
            }
            return res.json({ status: 'success', data: `user: ${parsedData.email} created`});
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.errors });
        }
    }    
};
export default userController;

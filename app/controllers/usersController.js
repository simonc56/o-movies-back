import {User} from "../models/associations.js"

const userController = {
    async getUserById(req, res) {
        const user = await User.findByPk(1)
        console.log(JSON.stringify(user))
    }
};
userController.getUserById()
export default userController;

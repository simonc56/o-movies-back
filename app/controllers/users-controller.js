import {User} from "../models/index.js"


const userController = {
    async getUserById(req, res) {
        const user = await User.findByPk(1)
    }
};
userController.getUserById()
export default userController;

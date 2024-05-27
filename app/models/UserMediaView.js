import { Model, Datatypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class UserMediaView extends Model {}

UserMediaView.init({
  user_id: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
  media_id: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
  viewed_at: {
    type: Datatypes.DATE,
    allowNull: false,
    defaultValue: Datatypes.NOW,
  },
}, {
  sequelize,
  tableName: "user_media_view",
});

export default UserMediaView;

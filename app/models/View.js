import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class View extends Model {}

View.init({
  media_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }},
{
  sequelize,
  tableName:"view"
    
});
import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Rating extends Model {}

Rating.init({
  value: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
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
  tableName:"rating"
    
});
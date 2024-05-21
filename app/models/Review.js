import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Review extends Model {}

Review.init({
  content: {
    type: DataTypes.TEXT,
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
  tableName:"review"  
});



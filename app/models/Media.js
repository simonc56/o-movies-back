import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Media extends Model {}

Media.init({
    firstname: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
        sequelize,
        tableName:"media"
    
});
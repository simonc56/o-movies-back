import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class PlaylistHasMedia extends Model {}

PlaylistHasMedia.init({
  playlist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  media_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }},
{
  sequelize,
  tableName:"playlist_has_media"
    
});
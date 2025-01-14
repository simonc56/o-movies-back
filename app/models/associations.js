import { Role } from "./Role.js";
import { Media } from "./Media.js";
import { User } from "./User.js";
import { Playlist } from "./Playlist.js";
import { Rating } from "./Rating.js";
import { Review } from "./Review.js";

import { sequelize } from "./sequelizeClient.js";

//User 
User.belongsTo(Role,{
  as:"role",
  foreignKey:"role_id"
});

//Playlist 
Playlist.belongsTo(User,{
  as:"user",
  foreignKey:"user_id"
});

User.hasMany(Playlist, {
  as: "playlists",
  foreignKey: "user_id"
});
  
//View
User.belongsToMany(Media, {
  as:"medias_view",
  through:"view",
  foreignKey:"user_id"
});
Media.belongsToMany(User, {
  as:"users_view",
  through:"view",
  foreignKey:"media_id"
});

//Rating
User.belongsToMany(Media, {
  as:"medias_rating",
  through:"rating",
  foreignKey:"user_id"
});
Media.belongsToMany(User, {
  as:"users_rating",
  through:"rating",
  foreignKey:"media_id"
});
Rating.belongsTo(User, { foreignKey: "user_id", as: "user" });
Rating.belongsTo(Media, { foreignKey: "media_id", as: "media" });

//Review
User.belongsToMany(Media, {
  as:"medias_review",
  through:"review",
  foreignKey:"user_id"
});
Media.belongsToMany(User, {
  as:"users_review",
  through:"review",
  foreignKey:"media_id"
});
Review.belongsTo(User, { foreignKey: "user_id", as: "user" });
Review.belongsTo(Media, { foreignKey: "media_id", as: "media" });

//Playlist has media 
Playlist.belongsToMany(Media,{
  as: "medias",
  through:"playlist_has_media",
  foreignKey: "playlist_id",
  onDelete: "CASCADE"
});

Media.belongsToMany(Playlist,{
  as:"playlists",
  through:"playlist_has_media",
  foreignKey: "media_id",
  onDelete: "CASCADE"
});


export { Role, Media, User, Playlist, Rating, Review, sequelize };
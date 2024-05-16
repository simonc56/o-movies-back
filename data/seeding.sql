BEGIN;

INSERT INTO "role" ("level") VALUES 
('Admin'),
('User');

INSERT INTO "user" ("firstname", "lastname", "password", "email", "birthdate", "role_id") VALUES
('John', 'Doe', 'password123', 'john@example.com', '1990-01-01', 1),
('Jane', 'Smith', 'pass123', 'jane@example.com', '1995-05-15', 2);

INSERT INTO "playlist" ("name", "user_id") VALUES
('Favorites', 1),
('Watch Later', 2);

INSERT INTO "media" ("tmdb_id") VALUES
(519182),
(157336);

INSERT INTO "playlist_has_media" ("playlist_id", "media_id") VALUES
(1, 1),
(2, 2);

INSERT INTO "review" ("content", "user_id", "media_id") VALUES
('Horrible experience!', 2, 2),
('Amazing performance!', 1, 2),
('Fantastic storyline!', 1, 2),
('Brilliantly executed!', 2, 2),
('Thrilling moments!', 1, 2),
('A masterpiece of cinema!', 2, 2),
('Disappointing plot.', 2, 1),
('Absolutely thrilling!', 1, 1),
('A cinematic gem!', 1, 1),
('Outstanding series!', 2, 1),
('Heart-pounding scenes!', 1, 1),
('A beautiful film!', 2, 1);

INSERT INTO "view" ("user_id", "media_id") VALUES
(1, 1),
(2, 2);

INSERT INTO "rating" ("value", "user_id", "media_id") VALUES
(4.5, 1, 1),
(5.0, 2, 2);

COMMIT;
BEGIN;

INSERT INTO "role" ("id", "level") OVERRIDING SYSTEM VALUE VALUES 
(1, 'Admin'),
(2, 'User');

SELECT setval('role_id_seq', (SELECT MAX(id) FROM "role"));

INSERT INTO "user" ("id", "firstname", "lastname", "password", "email", "birthdate", "role_id") OVERRIDING SYSTEM VALUE VALUES
(1, 'John', 'Doe', 'password123', 'john@example.com', '1990-01-01', 1),
(2, 'Jane', 'Smith', 'pass123', 'jane@example.com', '1995-05-15', 2);

SELECT setval('user_id_seq', (SELECT MAX(id) FROM "user"));

INSERT INTO "playlist" ("id", "name", "user_id") OVERRIDING SYSTEM VALUE VALUES
(1, 'Favorites', 1),
(2, 'Watch Later', 2);

SELECT setval('playlist_id_seq', (SELECT MAX(id) FROM "playlist"));

INSERT INTO "media" ("id", "tmdb_id", "title_fr") OVERRIDING SYSTEM VALUE VALUES
(1, 519182, 'Moi, Moche et Méchant 4'),
(2, 157336, 'Interstellar');

SELECT setval('media_id_seq', (SELECT MAX(id) FROM "media"));

INSERT INTO "playlist_has_media" ("playlist_id", "media_id") VALUES
(1, 1),
(2, 2);

INSERT INTO "review" ("id", "content", "user_id", "media_id") OVERRIDING SYSTEM VALUE VALUES
(1, 'Horrible experience!', 2, 2),
(2, 'Amazing performance!', 1, 2),
(3, 'Fantastic storyline!', 1, 2),
(4, 'Brilliantly executed!', 2, 2),
(5, 'Thrilling moments!', 1, 2),
(6, 'A masterpiece of cinema!', 2, 2),
(7, 'Disappointing plot.', 2, 1),
(8, 'Absolutely thrilling!', 1, 1),
(9, 'A cinematic gem!', 1, 1),
(10, 'Outstanding series!', 2, 1),
(11, 'Heart-pounding scenes!', 1, 1),
(12, 'A beautiful film!', 2, 1);

SELECT setval('review_id_seq', (SELECT MAX(id) FROM "review"));

INSERT INTO "view" ("id", "user_id", "media_id") OVERRIDING SYSTEM VALUE VALUES
(1, 1, 1),
(2, 2, 2);

SELECT setval('view_id_seq', (SELECT MAX(id) FROM "view"));

INSERT INTO "rating" ("id", "value", "user_id", "media_id") OVERRIDING SYSTEM VALUE VALUES
(1, 4.5, 1, 1),
(2, 5.0, 2, 2);

SELECT setval('rating_id_seq', (SELECT MAX(id) FROM "rating"));

COMMIT;
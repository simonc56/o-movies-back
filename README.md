# O'Movies - back

![Express][express-badge] ![Zod][zod-badge] ![Postgres][postgres-badge] ![Redis][redis-badge] ![Swagger][swagger-badge]

Site web, conçu en un mois, pour les passionnés de cinéma. Il permet de consulter les informations sur les films existants et à paraître, faire des recherches, commenter, noter et faire des listes personnalisées de films.

![image](https://raw.github.com/simonc56/o-movies-front/main/screenshot.png)

La partie front-end est disponible ici : https://github.com/simonc56/o-movies-front

Source de données : [TMDB](https://www.themoviedb.org/)

[express-badge]: https://img.shields.io/badge/Express.js-blue?logo=express
[zod-badge]: https://img.shields.io/badge/-Zod-484848?logo=zod&logoColor=white
[postgres-badge]: https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white
[redis-badge]: https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white
[swagger-badge]: https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=Swagger&logoColor=black

## Fonctionnalités

- Recherche de films par titre
- Affichage des films actuellement/prochainement au cinéma
- Création de compte utilisateur
- Création de playlists personnalisées
- Donner une note aux films
- Donner son avis sur les films (écrire un commentaire)
- Trier et filtrer les films par genre, date, popularité,...
- Voir la moyenne des notes données par les autres utilisateurs du site

## Préparation

Créer un compte sur [The Movie Database](https://developer.themoviedb.org/docs/getting-started) pour obtenir une clé API.

Installer le SGBDR [Postgresql](https://www.postgresql.org/).

Si vous souhaitez mettre en place un cache local, installer aussi [Redis](https://redis.io/).

## Installation

Cloner le repo :

```
git clone git@github.com:simonc56/filmovies-back.git
```

Installer les dépendances (avec npm, yarn ou pnpm) :

```
cd projet-o-movies-back/
pnpm install
```

Copier le `.env.exemple` en `.env` et renseigner les variables d'environnement.

Initialiser la base de données :

```
pnpm run db:init
```

Le serveur est prêt à être lancé :

```
pnpm start
```

ℹ️ la documentation de l'API est disponible à l'url `/api-docs/`

## Technologies utilisée

- express > https://expressjs.com/fr/
- zod > https://zod.dev/
- postgresql > https://www.postgresql.org/docs/
- redis > https://redis.io/docs/latest/
- jsdoc > https://www.npmjs.com/package/jsdoc
- jsdoc swagger > https://www.npmjs.com/package/express-jsdoc-swagger
- sequelize > https://sequelize.org/docs/v6/getting-started/
- bcrypt > https://www.npmjs.com/package/bcrypt
- regex > https://regex101.com/
- axios > https://axios-http.com/docs/intro
- jwt > https://www.npmjs.com/package/jsonwebtoken

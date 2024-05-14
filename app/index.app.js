import express from 'express';
import router from './routers/index.router.js';
import { initSwagger } from './services/swagger.js';

const app = express();

initSwagger(app)

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

export default app;
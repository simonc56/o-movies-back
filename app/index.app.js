import express from 'express';
import router from './routers/index.router.js';
import { initSwagger } from './services/swagger.js';

const app = express();

initSwagger(app)

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req, res) => {
    res.status(404).json({ error: "Ressource not found"});
  });
  
export default app;
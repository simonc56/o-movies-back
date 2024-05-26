import cors from "cors";
import express from "express";
import router from "./routers/index.router.js";
import { initSwagger } from "./services/swagger.js";



const app = express();

// Initilisation de swagger sur l'app
initSwagger(app);

// Autoriser les requêtes Cross-Origin
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);



//Middleware d'error 404 
app.use((req, res) => {
  res.status(404).json({ status: "fail", message: "Data not found" });
});


  
export default app;
import cors from "cors";
import express from "express";
import router from "./routers/index.router.js";
import { initSwagger } from "./services/swagger.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";


const app = express();
// Initilise Swagger
initSwagger(app);
// autorise cors from the env variable
app.use(cors({ origin: process.env.CORS_ORIGIN }));
//parse json and urlencoded data
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);
// error middleware check if the error is an instance of ApiError and return the error
app.use(errorMiddleware);

export default app;
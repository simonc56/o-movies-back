import { createServer } from "node:http";
import "dotenv/config";

import app from "./app/index.app.js";
import { testDbConnection } from "./app/models/sequelizeClient.js";

const PORT = process.env.PORT || 3000;

await testDbConnection();

const httpServer = createServer(app);

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 HTTP Server launched at http://localhost:${PORT} 🎉`);
  console.log(`Swagger js doc at http://localhost:${PORT}/api-docs/`);
});

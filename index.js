import { createServer } from "node:http";
import "dotenv/config";

import app from "./app/index.app.js";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`🚀 HTTP Server launched at http://localhost:${PORT} 🎉`);
  console.log(`Swagger js doc at http://localhost:${PORT}/api-docs/`);
  
});
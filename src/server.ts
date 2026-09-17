import http from "http";
import app from "./app";
import { connectDatabase } from "./config/db.config";
import ENV_CONFIG from "./config/env.config";

const PORT = ENV_CONFIG.PORT;
const DB_URI = ENV_CONFIG.DB_URI;

//* http server
const server = http.createServer(app);

//* database connect
connectDatabase(DB_URI);

//* server listen
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

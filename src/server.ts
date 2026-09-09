import http from "http";
import app from "./app";
import { connectDatabase } from "./config/db.config";

const PORT = 8080;
const DB_URI = "mongodb://localhost:27017/mern_project";

//* http server
const server = http.createServer(app);

//* database connect
connectDatabase(DB_URI);

//* server listen
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

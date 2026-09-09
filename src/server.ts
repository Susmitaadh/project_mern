import http from "http";
import app from "./app";

const PORT = 8080;

//* http server
const server = http.createServer(app);

//* database connect

//* server listen
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

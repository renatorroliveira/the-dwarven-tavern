import "dotenv/config";
import Koa from "koa";

const serverPort = process.env.APP_PORT;
const app = new Koa();

app.listen(serverPort);
console.log(`Server running at port ${serverPort}...`);

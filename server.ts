import cors from "cors";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import apiRouter from "./routes/api";
import ImageController from "./controller/image-controller";
dotenv.config({ path: __dirname + "/../.env" });

const app: Express = express();
const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

app.use(cors({ origin: "*" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));

app.get("/", (req: Request, res: Response) => {
  return res.send((process.env.APP_NAME ?? "APP") + " is Healthy");
});

app.get("/static/img/:filename", ImageController.get);
app.use(express.static(path.join(__dirname + "/../", "public")));

app.use("/api", apiRouter);

app.listen(port, () => {
  console.clear();
  console.log(`-------------------------------------------------------------`);
  console.log(`|\t⚡️[SERVER]: Server is running at on port ${port}\t\t|`);
  console.log(`|\t🌍 [SERVER]:  http://${host + ":" + port}\t\t\t|`);
  console.log(`-------------------------------------------------------------`);
});

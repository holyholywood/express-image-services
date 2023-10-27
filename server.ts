import cors from "cors";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
dotenv.config({ path: __dirname + "/../.env" });

const app: Express = express();
const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));

app.use(express.static(path.join(__dirname + "/../", "public")));

app.get("/", (req: Request, res: Response) => {
  return res.send((process.env.APP_NAME ?? "APP") + " is Healthy");
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/static/img/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const fileName = req.file.filename;
  const host = `${req.protocol}://${req.get("host")}`;
  const path = `${host}/static/img/${fileName}`;
  res.status(200).json({ fileName, path });
});

app.listen(port, () => {
  console.clear();
  console.log(`-------------------------------------------------------------`);
  console.log(`|\t⚡️[SERVER]: Server is running at on port ${port}\t\t|`);
  console.log(`|\t🌍 [SERVER]:  http://${host + ":" + port}\t\t\t|`);
  console.log(`-------------------------------------------------------------`);
});

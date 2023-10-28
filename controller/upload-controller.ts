import { Request, Response } from "express";
import logService from "../services/log-service";
class UploadController {
  static index(req: Request, res: Response) {
    // return imageService.upload;

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileName = req.file.filename;
    const host = `${req.protocol}://${req.get("host")}`;
    const path = `${host}/static/img/${fileName}`;
    const message = `from: ${req.ip},\t file: ${fileName},\t status: ${"SUCCESS"},\t time: ${new Date().toLocaleDateString(
      "id-ID"
    )} ${new Date().toLocaleTimeString("id-ID")} `;
    logService.write("uploads-log.txt", message);

    res.status(200).json({
      fileName,
      base_path: `${host}/static/img/`,
      url: path,
    });
  }

  static test(req: Request, res: Response) {
    return res.status(200).json({
      req: req.headers["content-type"],
      body: req.body,
      is: req.is("urlencoded"),
    });
  }
}

export default UploadController;

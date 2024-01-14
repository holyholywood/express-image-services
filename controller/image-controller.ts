import { Request, Response } from "express";
import path from "path";
import sharp from "sharp";

class ImageController {
  static get(req: Request, res: Response) {
    const temp = path.join(__dirname + "/../../", "public/static/img/", req.params.filename);
    const imagePath = temp;
    const width = Number(req.query.width) || null;
    const height = Number(req.query.height) || null;
    const quality = Number(req.query.quality ?? 100);
    const imageFormat = path.extname(imagePath).substr(1);
    sharp(imagePath)
      .resize(width, height)
      .webp({ quality })
      .toBuffer()
      .then((data) => {
        res.setHeader("Content-Type", `image/${imageFormat}`);
        res.end(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error resizing image");
      });
  }
}

export default ImageController;

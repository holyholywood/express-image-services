import { Request, Response } from "express";
import path from "path";
import sharp from "sharp";

class ImageController {
  static get(req: Request, res: Response) {
    const temp = path.join(__dirname + "/../../", "public/static/img/", req.params.filename);
    // const imagePath = path.join(__dirname, "public/static/img", req.params.filename);
    const imagePath = temp;
    // res.send(temp);
    const width = Number(req.query.width) || null;
    const height = Number(req.query.height) || null;

    if (width || height) {
      const imageFormat = path.extname(imagePath).substr(1);
      sharp(imagePath)
        .resize(width, height)
        .toBuffer()
        .then((data) => {
          res.setHeader("Content-Type", `image/${imageFormat}`);
          res.end(data);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error resizing image");
        });
    } else {
      res.sendFile(imagePath);
    }
  }
}

export default ImageController;

import { Request, Response } from "express";
class converterController {
  static export(req: Request, res: Response) {
    res.status(200).json({
      message: "success",
    });
  }
}

export default converterController;

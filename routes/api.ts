import { Router } from "express";
import imageService from "../services/image-service";
import UploadController from "../controller/upload-controller";

const apiRouter = Router();

apiRouter.post("/upload", imageService.upload().single("image"), UploadController.index);
apiRouter.post("/test", UploadController.test);

export default apiRouter;

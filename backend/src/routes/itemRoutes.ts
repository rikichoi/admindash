import express from "express";
import * as ItemController from "../controllers/itemController"
import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = express.Router();

upload.single("itemImage")

router.post("/create-item", upload.single("itemImage"), ItemController.createItem);

router.get("/get-items", ItemController.getItems)

router.delete("/delete-item/:name", ItemController.deleteItem)

export default router;
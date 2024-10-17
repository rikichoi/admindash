import express from "express";
import * as ItemController from "../controllers/itemController"

const router = express.Router();

router.post("/create-item", ItemController.createItem);

router.get("/get-items", ItemController.getItems)

export default router;
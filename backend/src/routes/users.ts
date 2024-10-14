import express from "express"
import * as UserController from "../controllers/users"

const router = express.Router();

router.get("/", UserController.getUsers);

router.get("/:userId", UserController.getUser)

router.post("/", UserController.createUser)

export default router;
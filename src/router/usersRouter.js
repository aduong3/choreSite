import express from "express";
import usersController from "../controller/usersController.js";

const router = express.Router();

const controller = usersController();

router.route("/auth-status").get(controller.checkAuthStatus);

router.route("/signup").post(controller.createNewUser);
router.route("/login").post(controller.logUserIn);
router.route("/logout").post(controller.logUserOut);

router.route("/:id/points").post(controller.addPointsToUser);
export default router;

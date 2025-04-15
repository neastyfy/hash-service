import express from "express";
import hashController from "./controllers/hashController.js";
import configController from "./controllers/configController.js";

const router = express.Router();

router.get("/", hashController.getHash);

router.get("/reload-config", configController.reloadConfig);

export default router;

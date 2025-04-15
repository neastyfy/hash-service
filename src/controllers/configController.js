import { loadConfig } from "../services/configService.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const reloadConfig = async (req, res) => {
  await loadConfig();
  res.status(204).json();
};

export default {
  reloadConfig: asyncErrorHandler(reloadConfig),
};

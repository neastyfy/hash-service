import hashService from "../services/hashService.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const getHash = async (req, res) => {
  const hash = await hashService.getHash();
  res.json({ message: hash });
};

export default {
  getHash: asyncErrorHandler(getHash),
};

import express from "express";
import { getFiles } from "#db/queries/files";

const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const files = await getFiles();
  res.send(files);
});

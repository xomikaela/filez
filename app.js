import express from "express";
import filesRouter from "#api/files";
import foldersRouter from "#api/folders";

const app = express();
export default app;

app.use(express.json());

app.use("/files", filesRouter);
app.use("/folders", foldersRouter);

app.use((req, res) => {
  res.status(404).send("Route not found.");
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === "23505") {
    return res.status(400).send("That name already exists in this folder.");
  }

  res.status(err.status || 500).send(err.message || "Internal server error.");
});

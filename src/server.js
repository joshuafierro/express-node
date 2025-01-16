import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import todoRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")).send(200);
});

app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});

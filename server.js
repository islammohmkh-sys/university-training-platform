import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;
const distPath = path.join(__dirname, "dist");
const indexPath = path.join(distPath, "index.html");

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "university-training-platform",
    version: "3.0.0"
  });
});

if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html not found. Run: npm run build");
}

app.use(express.static(distPath));

app.get("*", (req, res) => {
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  return res.status(500).send(`
    <h1>Build files not found</h1>
    <p>Please make sure Render Build Command is:</p>
    <pre>npm install --legacy-peer-deps && npm run build</pre>
    <p>And Start Command is:</p>
    <pre>npm start</pre>
  `);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`University Training Platform running on port ${PORT}`);
});

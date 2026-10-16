import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const backendDirectory = path.dirname(fileURLToPath(import.meta.url));

export const uploadsDir = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.resolve(backendDirectory, "..", "uploads");

fs.mkdirSync(uploadsDir, { recursive: true });

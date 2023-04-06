import multer from "multer";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Disk depolama alanı oluşturuyoruz
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files/frontend/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Dosya filtrelemesi yapacağız, sadece belirli tipteki dosyaları kabul edeceğiz
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files can be uploaded!"), false);
  }
};

// Multer middleware'i oluşturuyoruz
const upload = multer({
  storage,
  fileFilter,
});

export default upload;

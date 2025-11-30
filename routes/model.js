const express = require("express");
const router = express.Router();
const multer = require("multer");
const { fetch } = require("undici");
const agent = require("../agent");
//const FormData = require("form-data")

const upload = multer({ storage: multer.memoryStorage() });

// вернуть SPA страницу
router.get("/model", (req, res) => {
  res.sendFile("model.html", { root: "templates" });
});

// upload CSV → отправка на FastAPI
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const csvText = req.file.buffer.toString('utf-8');
    
    const response = await fetch("https://localhost:8443/upload", {
      method: "POST",
      headers: {
        'Content-Type': 'text/csv',
        'X-Filename': req.file.originalname
      },
      body: csvText,
      dispatcher: agent
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

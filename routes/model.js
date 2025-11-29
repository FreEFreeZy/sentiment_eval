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

// predict
router.get("/predict", async (req, res) => {
  try {
    const { file_id } = req.query;
    const response = await fetch(`https://localhost:8443/predict`, {
      dispatcher: agent
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// download results
router.get("/download", async (req, res) => {
  try {
    const { fileId } = req.params;
    const response = await fetch(`https://localhost:8443/download`, {
      dispatcher: agent
    });
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Disposition", `attachment; filename="${fileId}.csv"`);
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// evaluate
router.post("/evaluate", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const formData = new FormData();
    formData.append("file", new Blob([fileBuffer]), req.file.originalname);

    const response = await fetch("https://localhost:8443/evaluate", {
      method: "POST",
      body: formData,
      dispatcher: agent
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

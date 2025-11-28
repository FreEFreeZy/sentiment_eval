const express = require("express")
const multer = require("multer")
const path = require("path")
const uploadController = require("../controllers/uploadController")

const router = express.Router()
const upload = multer({
    storage: multer.memoryStorage()
})

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../templates/index.html"))
})


router.post("/", upload.single('file'), uploadController.uploadFile)

module.exports = router
const express = require("express")
const multer = require("multer")
const path = require("path")

const router = express.Router()
const upload = multer({
    storage: multer.memoryStorage()
})

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../templates/index.html"))
})

module.exports = router
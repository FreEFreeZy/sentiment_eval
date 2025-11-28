const https = require("https");

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
})

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file){
            return res.status(400).json({error: "File not found"})
        }

        const formData = new FormData();
        const blob = new Blob([req.file.buffer], {type: req.file.mimetype})
        formData.append('file', blob, req.file.originalname)

        const response = await fetch("https://localhost:8443/", {
            method: 'POST',
            body: formData,
            agent: httpsAgent
        })

        if (!response.ok){
            throw new Error(`Internal server error: ${response.status}`)
        }

        const result = await response.json()
        res.json(result)

    } catch (error) {
        res.status(500).json({
            error: "An error occured during file uploading",
            details: error.message
        })
    }
}


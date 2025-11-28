const agent = require("../agent")

const httpsAgent = agent

exports.getHealth = async (req, res) => {
    try {
        const response = await fetch("https://localhost:8443/health", {
            dispatcher: httpsAgent,
        })

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (response.ok) {
            const data = await response.json()
            res.json({
                status: 'OK',
                targetStatus: "Server is available",
                message: data
            })
        } else{
            res.json({
                status: 'OK',
                targetStatus: "Server is unavailable"
            })
        }

    } catch (error) {
        res.json({
            error: "An error occured during health check",
            details: error.message,
        })
    }
}


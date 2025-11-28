const express = require("express")
const path = require("path")
const cors = require("cors")
const fs = require("fs")

const app = express()
const PORT = 3000

app.use(cors())

const routesPath = path.join(__dirname, 'routes')
fs.readdirSync(routesPath).forEach(file => {
    if (file.endsWith(".js")) {
        const route = require(path.join(routesPath, file))
        // если index.js - то роутер обслуживает "/", иначе "/<имя файла без .js>"
        const routeName = file === 'index.js' ? "/" : `/${file.replace(".js", "")}` 
        app.use(routeName, route)
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'templates')))

module.exports = app
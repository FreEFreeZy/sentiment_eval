const { Agent } = require("undici");
const fs = require("fs");

const CA_PATH = process.env.MKCERT_CA || "C:/Users/Admin/AppData/Local/mkcert/rootCA.pem";

const ca = fs.readFileSync(CA_PATH, "utf8");

const httpsAgent = new Agent({
  connect: {
    ca,
    rejectUnauthorized: true,
  }
});

module.exports = httpsAgent;

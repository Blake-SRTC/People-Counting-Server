const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const router = express.Router();

server.listen(4000, () => {
    console.log("Server on: 4000");
});

// Middleware para usar otras caracteristicas de json
app.use(express.json());

app.use("/", router);

router.get("/", (req, res) => {
    res.send("Bienvenido");
});

router.post("/vision", (req, res) => {
    console.log(req.body);
    res.send("Recibido de vision");
});

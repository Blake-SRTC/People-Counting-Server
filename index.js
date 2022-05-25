const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const path = require("path");
const router = express.Router();

// Configuracion base de datos
require("./db");
// Modelos para DB
const schema = require("./models/shema");

server.listen(4000, () => {
    console.log("Server on: 4000");
});

// Middleware para usar otras caracteristicas de json
app.use(express.json());

app.use(express.static("public"));
app.use("/", router);

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

router.post("/vision", (req, res) => {
    res.send("Recibido de vision");
    insertData(req.body)
        .then((datos_guardados) => console.log(datos_guardados))
        .catch((err) => console.error("Datos no validos"));
});

router.post("/total", (req, res) => {
    res.send("Recibido de total");
    io.emit("data", req.body);
});

// Funcion repara datos y envia a DB totales
async function insertData(datos_guardar) {
    const conteo = new schema(datos_guardar);
    const datos_guardados = await conteo.save();
    return datos_guardados;
}


// Sockets tiempo real
io.on("connection", (socket) => {
    console.log("a user connected");
});
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const {
  taskPatch,
  taskPost,
  taskGet,
  taskPut,
  taskDelete
} = require("./controllers/taskController.js");

const app = express();

// Configuración de conexión a la base de datos
mongoose.connect("mongodb://127.0.0.1:27017/todo-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Conexión exitosa a MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error al conectar con MongoDB:", err);
});

// Middlewares
app.use(cors({ origin: "*", methods: "*" }));
app.use(bodyParser.json());

// Rutas para el API
app.get("/api/tasks", taskGet);
app.post("/api/tasks", taskPost);
app.patch("/api/tasks/:id", taskPatch);
app.put("/api/tasks/:id", taskPut);
app.delete("/api/tasks/:id", taskDelete);

// Iniciar servidor
app.listen(3000, () => console.log("Servidor ejecutándose en el puerto 3000"));
